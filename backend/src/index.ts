import express from 'express';
import { GameStateController } from './GameStateController';


const app = express();
var http = require('http').Server(app);
const port = 4000;

const io: SocketIO.Server = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let stateController: GameStateController;
let socketNames: any = {};

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  // Action
  socket.emit('players', Object.values(socketNames));

  // Listeners
  socket.on('disconnecting', () =>{
    delete socketNames[socket.id];
    io.emit('players', Object.values(socketNames));
  });

  socket.on('join', (sentName: string) => {
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
  
  socket.on('playFromHand', (uid: number) => {
    let name = socketNames[socket.id];
    stateController.play(name, uid);
    io.emit('gameState', stateController.state);
  });

  socket.on('targetPlayer', (targetName: string) => {
    stateController.targetPlayer(socketNames[socket.id], targetName);
    io.emit('gameState', stateController.state);
  });

  socket.on('targetCard', (cardUid: number) => {
    stateController.targetCard(cardUid);
    io.emit('gameState', stateController.state);
  });

  socket.on('stealCard', (cardUid: number) => {
    stateController.stealCard(socketNames[socket.id], cardUid);
    io.emit('gameState', stateController.state);
  });

  socket.on('draw', (deckType: string) => {
    stateController.deal(1, socketNames[socket.id], deckType);
    io.emit('gameState', stateController.state);
    io.emit('drawAnimation', socketNames[socket.id]);
  })

  socket.on('start', () => {
    console.log('start');
    stateController = new GameStateController(Object.values(socketNames));
    io.emit('gameState', stateController.state);
  })
});


http.listen(port, () => {
  console.log('listening on *:' + port);
});