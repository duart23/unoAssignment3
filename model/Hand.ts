import { Color, ICard, IDeck, Type } from "./Deck";
import { Player} from "./Game";

export interface IHand {
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1; // 1 for clockwise, -1 for counter-clockwise

  // Starts a new Hand with the given players
  startHand(players: Player[], deck: IDeck): void;

  // Plays a card from the current player's hand
  playCard(card: ICard, player: Player): void;

  nextPlayer(): void;

  applyCardEffect(card: ICard, chosenColor?: Color): void;

  pickColor(chosenColor: Color): void;

  reverseDirection(): void;

  calculatePlayerHandScore(player: Player): number;

  // Draws a card for the current player
  drawCard(playerIndex: number): void;

}

class Hand implements IHand {
  card: ICard;
  players: Player[]
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1;

   constructor(players: Player[], deck: IDeck) {
    this.players = players;
    this.deck = deck;
  }

  startHand(players: Player[], deck: IDeck): void {
    //Define inital scores
    players.forEach((player) => {
      player.score = 0;
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
    if (this.currentPlayerIndex !== this.players.findIndex(p => p.name === player.name)) {
      throw new Error("It's not your turn!");
    }

    if (
      !(
        card.color === this.discardPile[this.discardPile.length - 1].color ||
        card.type === this.discardPile[this.discardPile.length - 1].type ||
        (card.color === "black" &&
          this.discardPile[this.discardPile.length - 1].color !== "black")
      )
    ) {
      throw new Error("You cannot play this card!");
    }

    this.discardPile.push(card);
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
      this.pickColor(chosenColor!);
    } else if (card.type === Type.WILD_DRAW_FOUR) {
      this.pickColor(chosenColor!);
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

 
}
