import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IGame, Player} from "../interfaces/IGame";    

export interface IHand {
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1 ; // 1 for clockwise, -1 for counter-clockwise
  winner? : string;
  score?: number;
  gameId: string;
  _id: string; // Reference to the game this hand belongs to
  game: IGame;
  players: Player[];

  // Starts a new Hand with the given players
  startHand(): void;

  // Plays a card from the current player's hand
  playCard(card: ICard, player: Player, chosenColor?: Color): boolean;

  nextPlayer(): void;

  applyCardEffect(card: ICard, chosenColor?: Color): void;

  pickColor(chosenColor: Color): void;

  calculatePlayerHandScore(player: Player): number;

  calculateTotalPlayerScore(player: Player): void;

  // Draws a card for the current player
  drawCard(palyer: Player): void;
  
  penaltyDraw(player: Player): void;

  callUno(player: Player): void;

  checkUno(player: Player): void;

 // botTakeTurn(): void;


}