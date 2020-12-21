
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

export enum ActionType {
    CHOOSE,
    DESTROY, 
    Discard,
    DRAW,
    PLAY,
    PULL,
    REPLACE, 
    RETURN,
    SACRIFICE, 
    STEAL
}

export enum TriggerType {
    BOT_PHASE,
    DRAW_PHASE,
    ACTION_PHASE,
    EOT_PHASE,
    ENTER_STABLE,
    LEAVE_STABLE,
}

export type Trigger = {
    type: TriggerType,
    constraints?: Constraint[],
}

export enum ContraintType {
    WITHNAME,
    PLAYER,
    TYPE,
}

export type Constraint = {
    type: ContraintType;
    value: string;
}

export class GameState {
    constructor(){
        return {
            playerStates: [],
            deck: [],
            nursery: [],
            discardPile: [],
            selectedCard: undefined,
            turn: undefined,
            phase: Phase.BOT
        }
    }
    playerStates: PlayerState[];
    deck: Card[];
    nursery: Card[];
    discardPile: Card[];
    selectedCard: Card;
    turn: string;
    phase: Phase;
}

export type Action = {
    type: ActionType;
    constraints: Constraint[];
}

export type PlayerState = {
    name: string;
    hand: Card[];
    stable: Card[];
    actions: Action[];
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
    triggers?: Trigger;
}

export type PlayerSummary = {
    unicorns: number;
    cards: number;
}