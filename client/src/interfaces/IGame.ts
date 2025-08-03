import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";

export interface Player {
  _id: string;
  name: string;
  password: string;
  score: number;
  isBot: boolean;
  playerHand: ICard[];
  game: IGame
}
  
export interface IGame {
  _id: string;
  players: Player[];
  winner?: Player;
  gameState: "waiting" | "in-progress" | "finished";
  currentHand?: IHand | null;
  hands?: IHand[];

  checkGameWinner(player: Player): boolean;

  endHand(winningPlayer: Player): boolean;
}
