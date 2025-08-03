import { IGame, Player } from "../interfaces/IGame";
import { IHand } from "../interfaces/IHand";

export class Game implements IGame {
  _id: string;
  players: Player[];
  winner?: Player;
  gameState: "waiting" | "in-progress" | "finished";
  currentHand?: IHand;
  hands?: IHand[];

  constructor(game: IGame) {
    this._id = game._id;
    this.players = game.players;
    this.winner = game.winner;
    this.gameState = game.gameState;
    this.currentHand = game.currentHand ?? undefined;
    this.hands = [];
  }

  endHand(winningPlayer: Player): boolean {
    console.log(winningPlayer.name);
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
    this.players.forEach((p) => {
      p.playerHand = [];
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
