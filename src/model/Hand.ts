import { ICard, IDeck, Color, Type } from "@/interfaces/IDeck";
import { IHand } from "@/interfaces/IHand";
import { IGame, Player } from "@/interfaces/IGame";
import { Deck } from "./Deck";
import { Bot } from "./Bot";

export class Hand implements IHand {
  card?: ICard;
  players: Player[];
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1;
  game?: IGame;
  bot?: Bot;

  constructor(players: Player[], deck?: IDeck, card?: ICard, game?: IGame) {
    this.card = card;
    this.players = players;
    this.game = game;
    this.deck = deck ?? new Deck();
    this.currentPlayerIndex = 0;
    this.discardPile = [];
    this.direction = 1;
  }

  startHand(players: Player[]): void {
    //Define inital scores
    this.deck = new Deck();

    this.deck.initializeDeck();
    this.deck.shuffleDeck();
    this.direction = 1;

    for (let i = 0; i < 7; i++) {
      players.forEach((player) => {
        player.playerHand?.push(this.deck.dealCard());
      });
    }

    //First card on the discard pile
    do {
      this.discardPile.push(this.deck.dealCard());
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

  playCard(card: ICard, player: Player, chosenColor?: Color): boolean {
    if (
      this.currentPlayerIndex !==
      this.players.findIndex((p) => p.name === player.name)
    ) {
      return false;
    }

    const topCard = this.discardPile[this.discardPile.length - 1];

    if (
      card.type === Type.WILD ||
      card.type === Type.WILD_DRAW_FOUR ||
      card.color === topCard.color ||
      (card.type === Type.NUMBER &&
        topCard.type === Type.NUMBER &&
        card.value !== null &&
        topCard.value !== null &&
        card.value === topCard.value) ||
      (card.type === Type.DRAW_TWO && topCard.type === Type.DRAW_TWO) ||
      (card.type === Type.REVERSE && topCard.type === Type.REVERSE) ||
      (card.type === Type.SKIP && topCard.type === Type.SKIP)
    ) {
      this.discardPile.push(card);
      player.playerHand = player.playerHand?.filter((c) => c !== card);
    } else {
      return false;
    }

    return true;
  }

  applyCardEffect(card: ICard, chosenColor?: Color): void {
    if (card.type === Type.SKIP) {
      this.nextPlayer();
      return;
    } else if (card.type === Type.REVERSE) {
      this.reverseDirection;
      return;
    } else if (card.type === Type.DRAW_TWO) {
      const nextPlayer =
        this.players[
          (this.currentPlayerIndex + this.direction + this.players.length) %
            this.players.length
        ];
      for (let i = 0; i < 2; i++) {
        this.penaltyDraw(nextPlayer);
      }
      return;
    } else if (card.type === Type.WILD) {
      if (chosenColor) {
        this.pickColor(chosenColor);
        return;
      }
    } else if (card.type === Type.WILD_DRAW_FOUR) {
      if (chosenColor) {
        this.pickColor(chosenColor);
      }
      const nextPlayer =
        this.players[
          (this.currentPlayerIndex + this.direction + this.players.length) %
            this.players.length
        ];
      for (let i = 0; i < 4; i++) {
        console.log("+1");
        this.penaltyDraw(nextPlayer);
      }
      return;
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

  drawCard(player: Player): void {
    if (
      this.currentPlayerIndex !==
      this.players.findIndex((p) => p.name === player.name)
    ) {
      throw new Error("It's not your turn!");
    } else {
      player.playerHand?.push(this.deck.dealCard());
    }
  }

  penaltyDraw(player: Player): void {
    player.playerHand?.push(this.deck.dealCard());
  }

  // Calculate the score of a player's hand
  calculatePlayerHandScore(player: Player): number {
    let totalScore = 0;
    player.playerHand?.forEach((card) => {
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
    console.log(player.name);

    let newScore = player.score || 0;
    this.players.forEach((p) => {
      if (p.playerHand?.length === 0) return;
      newScore += this.calculatePlayerHandScore(p);
      console.log(newScore);
    });

    player.score = newScore;
  }

  callUno(player: Player): void {
    if (!player.playerHand) return;
    if (
      this.currentPlayerIndex !==
      this.players.findIndex((p) => p.name === player.name)
    ) {
      throw new Error("It's not your turn to call Uno!");
    } else if (player.playerHand.length > 2) {
      throw new Error("You cannot call Uno with more than 2 cards in hand!");
    } else player.hasCalledUno = true;
  }

  checkUno(player: Player): void {
    if (!player.hasCalledUno) {
      for (let i = 0; i < 4; i++) {
        player.playerHand?.push(this.deck.dealCard());
      }
    }
    player.hasCalledUno = false;
  }

  botTakeTurn(): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.isBot && currentPlayer instanceof Bot) {
      currentPlayer.botTakeTurn(); // Call Bot-specific logic
    }
  }
}
