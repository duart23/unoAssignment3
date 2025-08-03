import { IGame, Player } from "@/interfaces/IGame";
import { IHand } from "@/interfaces/IHand";

export class Game implements IGame {
  _id: string;
  players: Player[];
  winner?: Player;
  gameState: "waiting" | "in-progress" | "finished";
  currentHand?: IHand;
  hands?: IHand[] | string[];

  constructor(game: IGame) {
    this._id = game._id;
    this.players = game.players;
    this.winner = game.winner;
    this.gameState = game.gameState;
    this.currentHand = game.currentHand === null ? undefined : game.currentHand;
    this.hands = game.hands === null ? undefined : game.hands;
  }


  checkGameWinner(player: Player): boolean {
    if (player.score >= 500) {
      console.log(`${player.name} wins with a score of ${player.score}!`);
      return true;
    }
    return false;
  }
}
