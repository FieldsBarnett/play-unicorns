"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStateController = void 0;
const models_1 = require("./models");
const packs_1 = require("./packs");
class GameStateController {
    constructor(playerNames) {
        this.state = new models_1.GameState();
        this.cardIndex = {};
        this.init(playerNames, [packs_1.baseDeck1]);
    }
    init(playerNames, packs) {
        this.state.selectedCard = null;
        this.populateDecks(packs);
        this.state.nursery.forEach(card => { this.cardIndex[card.uid] = card; });
        this.state.deck.forEach(card => { this.cardIndex[card.uid] = card; });
        playerNames.forEach(playerName => {
            this.state.playerStates.push({ name: playerName, hand: [], stable: [this.state.nursery.pop()] });
        });
        this.deal(5);
    }
    populateDecks(packs) {
        let nursery = [];
        let deck = [];
        let cardNumber = 0;
        // Generate
        packs.forEach((pack) => {
            pack.forEach((specification) => {
                let belongingDeck = (specification.type === models_1.CardType.BABY_UNICORN) ? nursery : deck;
                [...Array(specification.amount)].forEach(() => {
                    belongingDeck.push({ uid: cardNumber, id: specification.id, type: specification.type });
                    cardNumber++;
                });
            });
        });
        // Shuffle
        this.shuffle(deck);
        this.shuffle(nursery);
        // Populate
        this.state.deck = deck;
        this.state.nursery = nursery;
    }
    shuffle(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
    deal(cards, player, deckType) {
        if (player === undefined) {
            // Deal to all players if not specified
            this.state.playerStates.forEach((playerState) => {
                this.deal(cards, playerState.name);
            });
        }
        else {
            let dealtCards;
            if (deckType == 'nursery')
                dealtCards = this.state.nursery.splice(-cards);
            else if (deckType == 'discardPile')
                return;
            else
                dealtCards = this.state.deck.splice(-cards); // deck
            let selectedPlayerState = this.getPlayerState(player);
            selectedPlayerState.hand = selectedPlayerState.hand.concat(dealtCards);
        }
    }
    getPlayerState(player) {
        return this.state.playerStates.find(playerState => {
            return playerState.name == player;
        });
    }
    getCard(uid) {
        return this.cardIndex[uid] || {};
    }
    play(player, uid) {
        let playerState = this.getPlayerState(player);
        let card = this.getCard(uid);
        if (card.type === models_1.CardType.INSTANT || card.type === models_1.CardType.MAGIC) {
            // to discard pile
            playerState.hand = playerState.hand.filter(card => card.uid != uid); // remove from hand
            this.state.discardPile.push(card);
            this.state.selectedCard = null;
        }
        else if (card.type === models_1.CardType.BASIC_UNICORN || card.type === models_1.CardType.MAGICAL_UNICORN || models_1.CardType.BABY_UNICORN) {
            // to own stable
            playerState.hand = playerState.hand.filter(card => card.uid != uid); // remove from hand
            this.getPlayerState(player).stable.push(card);
            this.state.selectedCard = null;
        }
        else { // upgrade or downgrade
            this.state.selectedCard = (this.state.selectedCard && card.uid === this.state.selectedCard.uid) ? null : card;
        }
    }
    targetPlayer(sourceName, targetName) {
        let selected = this.state.selectedCard;
        if (!selected)
            return;
        if ([models_1.CardType.DOWNGRADE, models_1.CardType.UPGRADE].includes(selected.type)) {
            let sourcePlayer = this.getState(sourceName);
            let targetPlayer = this.getState(targetName);
            sourcePlayer.hand = sourcePlayer.hand.filter((card) => card.uid != selected.uid);
            targetPlayer.stable.push(selected);
            this.state.selectedCard = null;
        }
    }
    targetCard(uid) {
        // Remove from hand or stable
        for (let i = 0; i < this.state.playerStates.length; i++) {
            let playerState = this.state.playerStates[i];
            playerState.hand = playerState.hand.filter(card => card.uid != uid);
            playerState.stable = playerState.stable.filter(card => card.uid != uid);
        }
        // Add to discard pile
        this.state.discardPile.push(this.getCard(uid));
    }
    stealCard(theifName, uid) {
        // Remove from hand or stable
        let wasInHand = false;
        for (let i = 0; i < this.state.playerStates.length; i++) {
            let playerState = this.state.playerStates[i];
            playerState.hand = playerState.hand.filter(card => {
                if (card.uid == uid)
                    wasInHand = true;
                return card.uid != uid;
            });
            playerState.stable = playerState.stable.filter(card => card.uid != uid);
        }
        // Add to discard pile
        let theifState = this.getPlayerState(theifName);
        if (wasInHand)
            theifState.hand.push(this.getCard(uid));
        else
            theifState.stable.push(this.getCard(uid));
    }
    getState(playerName) {
        return this.state.playerStates.find((playerState) => playerState.name == playerName);
    }
}
exports.GameStateController = GameStateController;
//# sourceMappingURL=GameStateController.js.map