import { IGame, Player } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";

export class Game implements IGame {
  players: Player[];
  gameId: number;
  currentHand?: IHand;
  winner?: Player;

  constructor(players: Player[], gameId: number, currentHand?: IHand) {
    this.players = players;
    this.gameId = gameId;
    this.currentHand = undefined;
  }

  createGame(players: Player[], gameId: number): IGame {
    return new Game(players, gameId);
  }

  joinGame(gameId: number, player: Player): void {
    if (!gameId) {
      throw new Error("Game does not exist!");
    }
    this.players.push(player);
  }

  startGame(gameId: number): void {
    if (!gameId) {
      throw new Error("Game does not exist!");
    }
    if (this.players.length < 2) {
      throw new Error("Not enough players to start the game!");
    }
    this.currentHand?.startHand(this.players);
  }

  endHand(winningPlayer: Player): boolean {
    if (!this.currentHand) {
      throw new Error("No current hand to end.");
    }

    this.currentHand.calculateTotalPlayerScore(winningPlayer);

    const isGameOver = this.checkGameWinner(winningPlayer);
    if (isGameOver) {
      console.log(
        `${winningPlayer.name} wins the game with ${winningPlayer.score} points!`
      );
      return isGameOver;
    }

    console.log("Starting a new hand...");
    this.currentHand.discardPile = []; 
    this.currentHand.startHand(this.players);
    return false;
  }

  checkGameWinner(player: Player): boolean {
    if (player.score >= 500) {
      console.log(`${player.name} wins with a score of ${player.score}!`);
      return true;
    }
    return false;
  }
}
