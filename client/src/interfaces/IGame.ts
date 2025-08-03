import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";

export interface Player {
  _id: string;
  name: string;
  password: string;
  score: number;
  isBot: boolean;
  game: IGame
}
  
export interface IGame {
  _id: string;
  players: Player[];
  winner?: Player;
  gameState: "waiting" | "in-progress" | "finished";
  currentHand?: IHand | null;
  hands?: IHand[] | string[];

  checkGameWinner(player: Player): boolean;

}
