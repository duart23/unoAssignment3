import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";

export interface Player {
  name: string;
  playerHand: ICard[];
  score: number;
  hasCalledUno: boolean;
}
  
export interface IGame {
  players: Player[];
  gameId: number;
  currentHand: IHand;
  winner?: Player;

  createGame(players: Player[]): void;

  joinGame(gameId: number,  player: Player): void;

  startGame(gameId: number): void;

  checkGameWinner(player: Player): boolean;

  endHand(winningPlayer: Player): void;


}
