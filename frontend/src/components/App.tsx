import './App.css';
import React, { useEffect, useState } from 'react';
import Lobby from './Lobby';
import socket from '../context/socket';
import Board from './Board';

export default function App() {
  const [gameState, setGameState] = useState<any>();
  const [name, setName] = useState<String>("");
  useEffect(() => {
    socket.once('gameState', (gameState: any) => {
      console.log(gameState);
      setGameState(gameState);
    });
  }, [1]);

  return (
    gameState ? <Board gameState={gameState} myName={name}/> : <Lobby name={name} setName={setName}/>
  );
}
