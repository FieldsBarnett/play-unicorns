"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.CardType = void 0;
var CardType;
(function (CardType) {
    CardType[CardType["BABY_UNICORN"] = 0] = "BABY_UNICORN";
    CardType[CardType["BASIC_UNICORN"] = 1] = "BASIC_UNICORN";
    CardType[CardType["MAGICAL_UNICORN"] = 2] = "MAGICAL_UNICORN";
    CardType[CardType["MAGIC"] = 3] = "MAGIC";
    CardType[CardType["INSTANT"] = 4] = "INSTANT";
    CardType[CardType["UPGRADE"] = 5] = "UPGRADE";
    CardType[CardType["DOWNGRADE"] = 6] = "DOWNGRADE";
})(CardType = exports.CardType || (exports.CardType = {}));
class GameState {
    constructor() {
        return {
            playerStates: [],
            deck: [],
            nursery: [],
            discardPile: [],
            selectedCard: undefined
        };
    }
}
exports.GameState = GameState;
//# sourceMappingURL=models.js.map