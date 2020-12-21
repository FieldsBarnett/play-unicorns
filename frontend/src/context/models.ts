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
    BABY,
    BASIC,
    MAGICAL,
    MAGIC,
    INSTANT,
    UPGRADE,
    DOWNGRADE,
    ULTIMATE
}

export enum Phase {
    BOT,
    DRAW,
    ACTION,
    EOT
}