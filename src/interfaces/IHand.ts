import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IGame, Player} from "../interfaces/IGame";    

export interface IHand {
  card?: ICard | undefined;
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1 ; // 1 for clockwise, -1 for counter-clockwise
  game?: IGame; // Reference to the game this hand belongs to

  // Starts a new Hand with the given players
  startHand(players: Player[]): void;

  // Plays a card from the current player's hand
  playCard(card: ICard, player: Player, chosenColor?: Color): void;

  nextPlayer(): void;

  applyCardEffect(card: ICard, chosenColor?: Color): void;

  pickColor(chosenColor: Color): void;

  reverseDirection(): void;

  calculatePlayerHandScore(player: Player): number;

  calculateTotalPlayerScore(player: Player): void;

  // Draws a card for the current player
  drawCard(palyer: Player): void;
  
  callUno(player: Player): void;

  checkUno(player: Player): void;


}