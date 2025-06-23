import { IGame, Player } from "@/interfaces/IGame";
import { ICard, Color, Type } from "@/interfaces/IDeck";
import { IHand } from "@/interfaces/IHand";

export class Bot implements Player {
  name: string;
  playerHand?: ICard[];
  score: number;
  hasCalledUno: boolean;
  isBot: boolean;

  game?: IGame;

  constructor(name: string) {
    this.name = name;
    this.playerHand = [];
    this.score = 0;
    this.hasCalledUno = false;
    this.isBot = true;
  }

  takeTurn(): void {
    if (!this.game || !this.game.currentHand) {
      throw new Error("No current hand to play.");
    }

    const discardPile = this.game.currentHand.discardPile;
    if (!discardPile || discardPile.length === 0) {
      throw new Error("No cards in discard pile.");
    }
    const topCard = discardPile[discardPile.length - 1];

    const playableCard = this.playerHand?.find(
      (card) =>
        card.color === topCard.color ||
        (card.type === Type.NUMBER && card.value === topCard.value) ||
        card.type === topCard.type ||
        card.color === Color.BLACK
    );

    this.game.currentHand.callUno(this);

    if (playableCard) {
      let chosenColor: Color;
      if (
        playableCard.type === Type.WILD ||
        playableCard.type === Type.WILD_DRAW_FOUR
      ) {
        chosenColor = this.pickMostCommonColor();
        this.game.currentHand.playCard(playableCard, this, chosenColor);
      } else {
        this.game.currentHand.playCard(playableCard, this);
      }
    } else {
      this.game.currentHand.drawCard(this);
      this.game.currentHand.nextPlayer();
    }
  }

  private pickMostCommonColor(): Color {
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

    return Object.entries(colorCount).sort(
      (a, b) => b[1] - a[1]
    )[0][0] as Color;
  }
}
