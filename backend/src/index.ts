import express from 'express';
import { GameStateController } from './GameStateController';

// TODO
// Keep track of turns
// Add steal/target based on what you can do
// Detect win
// Rework deck backs and add animation for draw

const app = express();
var http = require('http').Server(app);
const port = process.env.PORT || 4000;

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
    // Check not null or blank
    if (!sentName) {
      socket.emit('badName', "You must enter a name");
      return;
    }
    // Check unique
    if (Object.values(socketNames).includes(name)) {
      socket.emit('badName', "Someone else is using that name");
      return;
    }
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
    stateController.takeCard(socketNames[socket.id], cardUid);
    io.emit('gameState', stateController.state);
  });

  socket.on('draw', (deckType: string) => {
    stateController.deal(1, socketNames[socket.id], deckType);
    io.emit('gameState', stateController.state);
    io.emit('drawAnimation', socketNames[socket.id]);
  })

  socket.on('start', () => {
    if (Object.keys(socketNames).length < 2) {
      io.emit('badStart', "You can't play by yourself!");
      return;
    }
    stateController = new GameStateController(Object.values(socketNames));
    io.emit('gameState', stateController.state);
  })

  socket.on('search', (searchTarget) => {
    let choices = stateController.getChoices(searchTarget);
    io.emit('choices', choices);
  })

  socket.on('choose', choiceUid => {
    stateController.takeCard(socketNames[socket.id], choiceUid);
    io.emit('gameState', stateController.state);
  })
});


http.listen(port, () => {
  console.log('listening on *:' + port);
});