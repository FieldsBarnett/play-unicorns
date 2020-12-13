export type PlayerState = {
    name: string;
    hand: Card[];
    stable: Card[];
  }
  
export type GameState = {
    playerStates: PlayerState[];
    deck: Card[];
    nursery: Card[];
    discardPile: Card[];
    selectedCard: Card | null;
}

export type Card = {
    uid?: number;
    id?: string;
    name?: string;
    type: CardType;
    chaos?: number;
    useOffset?: boolean;
}

export enum CardType {
    BABY_UNICORN,
    BASIC_UNICORN,
    MAGICAL_UNICORN,
    MAGIC,
    INSTANT,
    UPGRADE,
    DOWNGRADE
}