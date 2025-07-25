import { IGame, Player } from "@/interfaces/IGame";
import { ICard, Color, Type } from "@/interfaces/IDeck";

export class Bot implements Player {
  name: string;
  playerHand?: ICard[];
  score: number;
  hasCalledUno: boolean;
  isBot: boolean;
  chosenColor?: Color;
  game?: IGame;

  constructor(name: string, game?: IGame) {
    this.name = name;
    this.playerHand = [];
    this.score = 0;
    this.hasCalledUno = false;
    this.isBot = true;
    this.game = game;
  }

  botTakeTurn(): void {
    if (!this.game || !this.game.currentHand) {
      throw new Error("No current hand to play.");
    }

    const discardPile = this.game.currentHand.discardPile;
    if (!discardPile || discardPile.length === 0) {
      throw new Error("No cards in discard pile.");
    }

    const topCard = discardPile[discardPile.length - 1];

    const playableCards = this.playerHand?.filter((card) => {
      if (!card || !topCard) return false;

      const isMatchingColor = card.color === topCard.color;
      const isMatchingNumber =
        card.type === Type.NUMBER &&
        topCard.type === Type.NUMBER &&
        card.value != null &&
        card.value === topCard.value;
      const isMatchingType = card.type === topCard.type && card.type !== Type.NUMBER;
      const isWildCard = card.color === Color.BLACK;

      return (
        isMatchingColor || isMatchingNumber || isMatchingType || isWildCard
      );
    });

    if (playableCards && playableCards.length > 0) {
      const playableCard = playableCards[Math.random() * playableCards.length | 0];

      if (
        playableCard.type === Type.WILD ||
        playableCard.type === Type.WILD_DRAW_FOUR
      ) {
        this.pickMostCommonColor();
        this.game.currentHand.playCard(playableCard, this);
        this.game.currentHand.applyCardEffect(playableCard, this.chosenColor);
        this.chosenColor === undefined;
      } else {
        this.game.currentHand.playCard(playableCard, this);
        this.game.currentHand.applyCardEffect(playableCard, this.chosenColor);
      }

      this.game.currentHand.nextPlayer();
    } else {
      this.game.currentHand.drawCard(this);
      this.game.currentHand.nextPlayer();
    }
  }

  pickMostCommonColor(): Color {

    const colorCount: Record<Color, number> = {
      [Color.RED]: 0,
      [Color.YELLOW]: 0,
      [Color.GREEN]: 0,
      [Color.BLUE]: 0,
      [Color.BLACK]: 0,
    };

    this.playerHand?.forEach((card) => {
      if (card.color !== Color.BLACK) {
        colorCount[card.color]++;
      }
    });

    this.chosenColor = Object.entries(colorCount).sort(
      (a, b) => b[1] - a[1]
    )[0][0] as Color;
    
    console.log(`Bot ${this.name} chose color: ${this.chosenColor}`);
    return this.chosenColor;
  }
}
