export enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  YELLOW = "yellow",
  BLACK = "black",
}

export enum Type {
  NUMBER = "number",
  SKIP = "skip",
  REVERSE = "reverse",
  DRAW_TWO = "draw_two",
  WILD = "wild",
  WILD_DRAW_FOUR = "wild_draw_four",
}

export interface ICard {
  color: Color;
  type: Type;
  value?: number;
}

export interface IDeck {
  cards: ICard[];
  // Initializes the deck with a standard set of Uno cards
  initializeDeck(): ICard[];

  // Shuffles the deck randomly
  shuffleDeck(): void;

  // Deals a specified number of cards to a player
  dealCard(): ICard;

  // Draws a card from the top of the deck
  size(): number;
}

class Deck implements IDeck {
  cards: ICard[] = [];

  initializeDeck(): ICard[] {
    const colors: Color[] = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW];
    const deck: ICard[] = [];

    colors.forEach((color) => {
      for (let i = 0; i <= 9; i++) {
        deck.push({ color, type: Type.NUMBER, value: i });
        if (i > 0) {
          deck.push({ color, type: Type.NUMBER, value: i });
        }
      }
    });

    colors.forEach((color) => {
      for (let i = 0; i < 2; i++) {
        deck.push({ color, type: Type.SKIP });
        deck.push({ color, type: Type.REVERSE });
        deck.push({ color, type: Type.DRAW_TWO });
      }
    });

    for (let i = 0; i < 4; i++) {
      deck.push({ color: Color.BLACK, type: Type.WILD });
      deck.push({ color: Color.BLACK, type: Type.WILD_DRAW_FOUR });
    }

    this.cards = deck;
    return this.cards;
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
