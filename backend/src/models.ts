import { Socket } from "socket.io";

export enum CardType {
    BABY_UNICORN,
    BASIC_UNICORN,
    MAGICAL_UNICORN,
    MAGIC,
    INSTANT,
    UPGRADE,
    DOWNGRADE
  }

export class GameState {
    constructor(){
        return {
            playerStates: [],
            deck: [],
            nursery: [],
            discardPile: [],
            selectedCard: undefined
        }
    }
    playerStates: PlayerState[];
    deck: Card[];
    nursery: Card[];
    discardPile: Card[];
    selectedCard: Card;
}

export type PlayerState = {
    name: string;
    hand: Card[];
    stable: Card[];
}

export type Card = {
    uid: number; // Unique for duplicates in that game
    id: string; // Unique for that type of card, used to fetch image on client side
    type: CardType;
}

export type CardSpecification = {
    id: string;
    type: CardType;
    amount: number;
}

export type PlayerSummary = {
    unicorns: number;
    cards: number;
}