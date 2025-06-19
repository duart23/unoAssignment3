import { Color, ICard, IDeck, Type } from "./Deck";
import { IHand } from "./Hand";

export interface Player {
  name: string;
  playerHand: ICard[];
  score: number;
}
  
export interface IGame {
  players: Player[];
  gameId: number;
  currentHand: IHand;


  createGame(players: Player[]): void;
  joinGame(gameId: number,  player: Player): void;
  startGame(gameId: number): void;
  checkWinner(): boolean;
  calculateTotalPlayerScore(player: Player): void;
}

class Game implements IGame {
  players: Player[];
  gameId: number;
  currentHand: IHand;

  constructor(players: Player[], currentHand: IHand, gameId: number) {
this.players = players;
  this.currentHand = currentHand;
  this.gameId = gameId;
  }


createGame(players: Player[]): void {
    this.players = players;     
  }

  joinGame(gameId: number, player: Player): void {
      if(!gameId){
        throw new Error("Game does not exist!")
      }
    this.players.push(player);


  }
  startGame(gameId: number): void {
      throw new Error("Method not implemented.");
  }
  checkWinner(): boolean {
    this.players.find((player) => {
      if (player.score >= 500) {
        console.log(`${player.name} wins with a score of ${player.score}!`);
        return true;
      }
    });
    return false;
  }

  // Calculate the total score for a player based on the other players' hands
  calculateTotalPlayerScore(player: Player): void {
    let newScore = player.score || 0;
    this.players.forEach((p) => {
      if (player.playerHand.length === 0) return;
      newScore += this.currentHand.calculatePlayerHandScore(p);
    });

    player.score = newScore;
  }
}
