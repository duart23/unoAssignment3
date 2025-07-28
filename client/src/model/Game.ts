import { IGame, Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";

export class Game implements IGame {
  players: Player[];
  gameId: string;
  currentHand: IHand | null = null;
  winner?: Player;


  constructor(players: Player[], gameId: string) {
    this.players = players;
    this.gameId = gameId;
  }

  createGame(players: Player[], gameId: string): IGame {
    return new Game(players, gameId);
  }

  joinGame(gameId: string, player: Player): void {
    if (!gameId) {
      throw new Error("Game does not exist!");
    }
    this.players.push(player);
  }

  startGame(gameId: string): void {
    if (!gameId) {
      throw new Error("Game does not exist!");
    }
    if (this.players.length < 2) {
      throw new Error("Not enough players to start the game!");
    }
    this.currentHand?.startHand();
  }

  endHand(winningPlayer: Player): boolean {

    console.log(winningPlayer.name)
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

    this.currentHand.discardPile = [];
    this.players.forEach(p => {
      p.playerHand = [];
      p.hasCalledUno = false;
    }); 
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
