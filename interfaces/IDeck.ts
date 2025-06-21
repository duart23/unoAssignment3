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

  // Returns the number of cards left in the deck
  size(): number;
}
