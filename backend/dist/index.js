"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GameStateController_1 = require("./GameStateController");
// TODO
// Use two decks for 6+ players
// Keep track of turns
// Add searching decks
// Add steal/target based on what you can do
// Detect win
const app = express_1.default();
var http = require('http').Server(app);
const port = process.env.PORT || 4000;
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let stateController;
let socketNames = {};
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
io.on('connection', (socket) => {
    // Action
    socket.emit('players', Object.values(socketNames));
    // Listeners
    socket.on('disconnecting', () => {
        delete socketNames[socket.id];
        io.emit('players', Object.values(socketNames));
    });
    socket.on('join', (sentName) => {
        let name = sentName.toUpperCase();
        // Check unique
        if (Object.values(socketNames).includes(name)) {
            socket.emit('badName');
            return;
        }
        socketNames[socket.id] = name;
        io.emit('players', Object.values(socketNames));
    });
    socket.on('playFromHand', (uid) => {
        let name = socketNames[socket.id];
        stateController.play(name, uid);
        io.emit('gameState', stateController.state);
    });
    socket.on('targetPlayer', (targetName) => {
        stateController.targetPlayer(socketNames[socket.id], targetName);
        io.emit('gameState', stateController.state);
    });
    socket.on('targetCard', (cardUid) => {
        stateController.targetCard(cardUid);
        io.emit('gameState', stateController.state);
    });
    socket.on('stealCard', (cardUid) => {
        stateController.takeCard(socketNames[socket.id], cardUid);
        io.emit('gameState', stateController.state);
    });
    socket.on('draw', (deckType) => {
        stateController.deal(1, socketNames[socket.id], deckType);
        io.emit('gameState', stateController.state);
        io.emit('drawAnimation', socketNames[socket.id]);
    });
    socket.on('start', () => {
        stateController = new GameStateController_1.GameStateController(Object.values(socketNames));
        io.emit('gameState', stateController.state);
    });
    socket.on('search', (searchTarget) => {
        let choices = stateController.getChoices(searchTarget);
        io.emit('choices', choices);
    });
    socket.on('choose', choiceUid => {
        stateController.takeCard(socketNames[socket.id], choiceUid);
        io.emit('gameState', stateController.state);
    });
});
http.listen(port, () => {
    console.log('listening on *:' + port);
});
//# sourceMappingURL=index.js.map