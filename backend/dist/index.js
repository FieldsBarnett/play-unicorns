"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GameStateController_1 = require("./GameStateController");
const app = express_1.default();
var http = require('http').Server(app);
const port = 4000;
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
            console.log('taken');
            socket.emit('nameTaken');
            return;
        }
        console.log('unique');
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
        stateController.stealCard(socketNames[socket.id], cardUid);
        io.emit('gameState', stateController.state);
    });
    socket.on('draw', (deckType) => {
        stateController.deal(1, socketNames[socket.id], deckType);
        io.emit('gameState', stateController.state);
        io.emit('drawAnimation', socketNames[socket.id]);
    });
    socket.on('start', () => {
        console.log('start');
        stateController = new GameStateController_1.GameStateController(Object.values(socketNames));
        io.emit('gameState', stateController.state);
    });
});
http.listen(port, () => {
    console.log('listening on *:' + port);
});
//# sourceMappingURL=index.js.map