import { ICard, IDeck, Color, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";
import { IGame, Player } from "../interfaces/IGame";

class Hand implements IHand {
  card: ICard;
  players: Player[];
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1;
  game: IGame;

  constructor(players: Player[], deck: IDeck, game: IGame) {
    this.players = players;
    this.deck = deck;
    this.game = game;
  }

  startHand(players: Player[], deck: IDeck): void {
    //Define inital scores
    players.forEach((player) => {
      player.score = 0;
      player.hasCalledUno = false;
    });

    deck.initializeDeck();
    deck.shuffleDeck();
    this.direction = 1;

    for (let i = 0; i < 7; i++) {
      players.forEach((player) => {
        player.playerHand.push(deck.dealCard());
      });
    }

    //First card on the discard pile
    do {
      this.discardPile.push(deck.dealCard());
      if (
        this.discardPile[0].type === "wild" ||
        this.discardPile[0].type === "wild_draw_four"
      ) {
        this.deck.cards.push(this.discardPile.pop()!);
      }
    } while (
      this.discardPile[0].type === "wild" ||
      this.discardPile[0].type === "wild_draw_four"
    );

    this.currentPlayerIndex = Math.floor(Math.random() * players.length);
  }

  playCard(card: ICard, player: Player): void {
    if (
      this.currentPlayerIndex !==
      this.players.findIndex((p) => p.name === player.name)
    ) {
      throw new Error("It's not your turn!");
    }

    if (
      !(
        card.color === this.discardPile[this.discardPile.length - 1].color ||
        card.type === this.discardPile[this.discardPile.length - 1].type ||
        card.color === "black"
      )
    ) {
      throw new Error("You cannot play this card!");
    }

    //Put card in the discarc pile and remove it from the player's hand
    this.discardPile.push(card);
    player.playerHand = player.playerHand.filter((c) => c !== card);

    if (player.playerHand.length === 0) {
      this.game.endHand(player); // call back into Game
      return;
    }

    this.checkUno(player);

    //Apply effects
    this.applyCardEffect(card);

    this.nextPlayer();
  }

  applyCardEffect(card: ICard, chosenColor?: Color): void {
    if (card.type === Type.SKIP) {
      this.nextPlayer();
    } else if (card.type === Type.REVERSE) {
      this.reverseDirection;
    } else if (card.type === Type.DRAW_TWO) {
      const nextPlayerIndex =
        (this.currentPlayerIndex + this.direction + this.players.length) %
        this.players.length;
      for (let i = 0; i < 2; i++) {
        this.drawCard(nextPlayerIndex);
      }
    } else if (card.type === Type.WILD) {
      if (!chosenColor) {
        throw new Error("You must pick a color for a wild card!");
      }
      this.pickColor(chosenColor!);
    } else if (card.type === Type.WILD_DRAW_FOUR) {
      if (!chosenColor) {
        throw new Error("You must pick a color for a wild card!");
      }
      this.pickColor(chosenColor);
      const nextPlayerIndex =
        (this.currentPlayerIndex + this.direction + this.players.length) %
        this.players.length;
      for (let i = 0; i < 4; i++) {
        this.drawCard(nextPlayerIndex);
      }
    }
  }

  pickColor(chosenColor: Color): void {
    this.discardPile[this.discardPile.length - 1].color = chosenColor;
  }

  nextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex +
        (this.direction === 1 ? 1 : -1) +
        this.players.length) %
      this.players.length;
  }

  reverseDirection(): void {
    this.direction *= -1;
  }

  drawCard(playerIndex: number): void {
    this.players[playerIndex].playerHand.push(this.deck.dealCard());
  }

  // Calculate the score of a player's hand
  calculatePlayerHandScore(player: Player): number {
    let totalScore = 0;
    player.playerHand.forEach((card) => {
      if (!!card.value && card.type === Type.NUMBER) {
        totalScore += card.value;
      } else if (
        card.type === Type.SKIP ||
        card.type === Type.REVERSE ||
        card.type === Type.DRAW_TWO
      ) {
        totalScore += 20;
      } else if (card.type === Type.WILD || card.type === Type.WILD_DRAW_FOUR) {
        totalScore += 50;
      } else {
        return;
      }
    });

    return totalScore;
  }

  // Calculate the total score for a player based on the other players' hands
  calculateTotalPlayerScore(player: Player): void {
    let newScore = player.score || 0;
    this.players.forEach((p) => {
      if (player.playerHand.length === 0) return;
      newScore += this.calculatePlayerHandScore(p);
    });

    player.score = newScore;
  }

  callUno(player: Player): void {
    if(this.currentPlayerIndex !==
      this.players.findIndex((p) => p.name === player.name)){
        throw new Error("It's not your turn to call Uno!");
      } else if (player.playerHand.length > 2) {
        throw new Error("You cannot call Uno with more than 2 cards in hand!");
      } else player.hasCalledUno = true;
  }

  checkUno(player: Player): void {
    if (!player.hasCalledUno) {
      for (let i = 0; i < 4; i++) {
        player.playerHand.push(this.deck.dealCard());
      }
    }
    player.hasCalledUno = false;
  }
}
