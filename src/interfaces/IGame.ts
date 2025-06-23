import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";

export interface Player {
  name: string;
  playerHand?: ICard[];
  score: number;
  hasCalledUno: boolean;
  isBot? : boolean;
}
  
export interface IGame {
  players: Player[];
  gameId: number;
  currentHand: IHand | null;
  winner?: Player;

  createGame(players: Player[], gameId: number): IGame;

  joinGame(gameId: number,  player: Player): void;

  startGame(gameId: number): void;

  checkGameWinner(player: Player): boolean;

  endHand(winningPlayer: Player): boolean;


}
