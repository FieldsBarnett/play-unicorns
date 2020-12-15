import { Card, CardSpecification, CardType, GameState } from "./models";
import { baseDeck1 } from "./packs";

export class GameStateController {
    constructor(playerNames: string[]) {
        this.init(playerNames, [baseDeck1]);
    }

    state = new GameState();
    cardIndex: any = {};

    init(playerNames: string[], packs: CardSpecification[][]) {
        this.state.selectedCard = null;
        this.populateDecks(packs);
        this.state.nursery.forEach(card => { this.cardIndex[card.uid] = card });
        this.state.deck.forEach(card => { this.cardIndex[card.uid] = card });
        playerNames.forEach(playerName => {
            this.state.playerStates.push( { name: playerName, hand: [], stable: [this.state.nursery.pop()]} )
        });
        this.deal(5);
    }

    private populateDecks(packs: CardSpecification[][]) {
        let nursery: Card[] = [];
        let deck: Card[] = [];
        let cardNumber = 0;
        // Generate
        packs.forEach( (pack: CardSpecification[]) => {
            pack.forEach( (specification: CardSpecification) => {
                let belongingDeck = (specification.type === CardType.BABY_UNICORN) ? nursery : deck;
                [...Array(specification.amount)].forEach( () => {
                    belongingDeck.push({uid: cardNumber++, id: specification.id, type: specification.type});
                    // Double cards if lots of players
                    if (this.state.playerStates.length >= 6) belongingDeck.push({uid: cardNumber++, id: specification.id, type: specification.type});
                })
            })
        });
        // Shuffle
        this.shuffle(deck);
        this.shuffle(nursery);
        // Populate
        this.state.deck = deck;
        this.state.nursery = nursery;
    }

    shuffle(cards: Card[]) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    deal(cards: number, player?: string, deckType?: string) {
        if (player === undefined) {
            // Deal to all players if not specified
            this.state.playerStates.forEach((playerState) => {
                this.deal(cards, playerState.name);
            })
        } else {
            let dealtCards: Card[];
            let selectedPlayerState = this.getPlayerState(player);
            if (deckType == 'nursery') {
                dealtCards = this.state.nursery.splice(-cards);
                selectedPlayerState.stable = selectedPlayerState.stable.concat(dealtCards);
            }
            else if (deckType == 'discardPile') return;
            else {
                dealtCards = this.state.deck.splice(-cards); // deck
                selectedPlayerState.hand = selectedPlayerState.hand.concat(dealtCards);
            }
        }
    }

    private getPlayerState(player: string) {
        return this.state.playerStates.find(playerState => {
            return playerState.name == player;
        });
    }

    private getCard(uid: number): Card {
        return this.cardIndex[uid] || {};
    }

    play(player: string, uid: number) {
        let playerState = this.getPlayerState(player);
        let card = this.getCard(uid);
        if (card.type === CardType.INSTANT || card.type === CardType.MAGIC) {
            // to discard pile
            playerState.hand = playerState.hand.filter(card => card.uid != uid); // remove from hand
            this.state.discardPile.push(card);
            this.state.selectedCard = null;
        }
        else if (card.type === CardType.BASIC_UNICORN || card.type === CardType.MAGICAL_UNICORN || CardType.BABY_UNICORN) {
            // to own stable
            playerState.hand = playerState.hand.filter(card => card.uid != uid); // remove from hand
            this.getPlayerState(player).stable.push(card);
            this.state.selectedCard = null;
        } else { // upgrade or downgrade
            this.state.selectedCard = (this.state.selectedCard && card.uid === this.state.selectedCard.uid) ? null : card;
        }
    }

    targetPlayer(sourceName: string, targetName: string) {
        let selected = this.state.selectedCard;
        if (!selected) return;
        if ([CardType.DOWNGRADE, CardType.UPGRADE].includes(selected.type)) {
            let sourcePlayer = this.getState(sourceName);
            let targetPlayer = this.getState(targetName);
            sourcePlayer.hand = sourcePlayer.hand.filter((card: Card) => card.uid != selected.uid);
            targetPlayer.stable.push(selected);
            this.state.selectedCard = null;
        }
    }

    targetCard(uid: number) {
        this.removeCard(uid);
        // Add to discard pile
        this.state.discardPile.push(this.getCard(uid));
    }

    removeCard(uid: number) {
        // Remove from hand or stable
        for (let i=0; i < this.state.playerStates.length; i++) {
            let playerState = this.state.playerStates[i];
            playerState.hand = playerState.hand.filter(card => card.uid != uid);
            playerState.stable = playerState.stable.filter(card => card.uid != uid);
        }
        // Remove from decks
        this.state.deck = this.state.deck.filter(card => card.uid != uid);
        this.state.discardPile = this.state.discardPile.filter(card => card.uid != uid);
        this.state.nursery = this.state.nursery.filter(card => card.uid != uid);
    }

    takeCard(theifName:string, uid: number, toStable?: boolean) {
        if (this.getCard(uid).type == CardType.BABY_UNICORN) toStable = true;
        
        this.removeCard(uid);
        let theifState = this.getPlayerState(theifName);
        if (toStable) theifState.stable.push(this.getCard(uid));
        else theifState.hand.push(this.getCard(uid));
    }

    getState(playerName: string) {
        return this.state.playerStates.find((playerState) => playerState.name == playerName);
    }

    getChoices(target: string) {
        // If its a deck
        switch (target) {
            case "nursery":
                return this.state.nursery;
            case "discardPile":
                return this.state.discardPile;
            case "deck":
                return this.state.deck;
        }
        // If its a player
        let targetPlayer = this.getPlayerState(target);
        if (targetPlayer) return targetPlayer.hand;
    }
}