import { IGame, Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";

class Game implements IGame {
  players: Player[];
  gameId: number;
  currentHand: IHand;
  winner?: Player;

  constructor(players: Player[], currentHand: IHand, gameId: number) {
    this.players = players;
    this.currentHand = currentHand;
    this.gameId = gameId;
  }

  createGame(players: Player[]): void {
    this.players = players;
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
    this.currentHand.startHand(this.players, this.currentHand.deck);
  }

  endHand(winningPlayer: Player): void {
    this.currentHand.calculateTotalPlayerScore(winningPlayer);

    const isGameOver = this.checkGameWinner(winningPlayer);
    if (isGameOver) {
      console.log(
        `${winningPlayer.name} wins the game with ${winningPlayer.score} points!`
      );
      return;
    }

    console.log("Starting a new hand...");
     this.currentHand.deck.cards = [];
    this.currentHand.discardPile = []; 
    this.currentHand.startHand(this.players, this.currentHand.deck);
  }

  checkGameWinner(player: Player): boolean {
    if (player.score >= 500) {
      console.log(`${player.name} wins with a score of ${player.score}!`);
      return true;
    }
    return false;
  }
}
