import { IDeck, ICard, Color, Type } from '@/interfaces/IDeck';

export class Deck implements IDeck {
  cards: ICard[] = [];

  initializeDeck(): void {
    const colors: Color[] = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW];
    this.cards = [];

    colors.forEach((color) => {
      for (let i = 0; i <= 9; i++) {
        this.cards.push({ color, type: Type.NUMBER, value: i });
        if (i > 0) {
          this.cards.push({ color, type: Type.NUMBER, value: i });
        }
      }
    });

    colors.forEach((color) => {
      for (let i = 0; i < 2; i++) {
        this.cards.push({ color, type: Type.SKIP });
        this.cards.push({ color, type: Type.REVERSE });
        this.cards.push({ color, type: Type.DRAW_TWO });
      }
    });

    for (let i = 0; i < 4; i++) {
      this.cards.push({ color: Color.BLACK, type: Type.WILD });
      this.cards.push({ color: Color.BLACK, type: Type.WILD_DRAW_FOUR });
    }
  }

  shuffleDeck(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.cards.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[random]] = [this.cards[random], this.cards[i]];
    }
  }
  dealCard(): ICard {
    const card = this.cards.shift();
    if (!card) {
      throw new Error("No cards left in the deck");
    }
    return card;
  }

  size(): number {
    return this.cards.length;
  }
}
