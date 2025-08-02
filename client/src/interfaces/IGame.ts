import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IHand } from "../interfaces/IHand";

export interface Player {
  name: string;
  playerHand: ICard[];
  score: number;
  hasCalledUno: boolean;
  isBot: boolean;
  _id: string;
  playerId: string;
  password: string;
  gameId: string | "none" | null;
}
  
export interface IGame {
  players: Player[];
  gameId: string;
  currentHand: IHand | null;
  winner?: Player;
  gameState: "waiting" | "in-progress" | "finished";

  createGame(players: Player[], gameId: string): IGame;

  joinGame(gameId: string,  player: Player): void;

  startGame(gameId: string): void;

  checkGameWinner(player: Player): boolean;

  endHand(winningPlayer: Player): boolean;
}
