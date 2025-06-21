import { Color, ICard, IDeck, Type } from "../interfaces/IDeck";
import { IGame, Player} from "../interfaces/IGame";    

export interface IHand {
  currentPlayerIndex: number;
  deck: IDeck;
  discardPile: ICard[];
  direction: 1 | -1; // 1 for clockwise, -1 for counter-clockwise
  game: IGame;

  // Starts a new Hand with the given players
  startHand(players: Player[], deck: IDeck): void;

  // Plays a card from the current player's hand
  playCard(card: ICard, player: Player): void;

  nextPlayer(): void;

  applyCardEffect(card: ICard, chosenColor?: Color): void;

  pickColor(chosenColor: Color): void;

  reverseDirection(): void;

  calculatePlayerHandScore(player: Player): number;

  calculateTotalPlayerScore(player: Player): void;

  // Draws a card for the current player
  drawCard(playerIndex: number): void;
  
  callUno(player: Player): void;

  checkUno(player: Player): void;


}