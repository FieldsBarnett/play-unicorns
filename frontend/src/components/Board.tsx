import './Board.css';
import React, { useEffect, useState } from 'react';
import { Hand } from './Hand';
import { Stable } from './Stable';
import { Deck } from './Deck';
import socket from '../context/socket';
import { Opponents } from './Opponents';
import { Card, CardType, GameState } from '../context/models';
import { CardsOverlay } from './CardsOverlay';

let nursery: Card[] = [
  {id: 'Baby Back', type: CardType.INSTANT }, {id: 'Baby Back', type: CardType.INSTANT }
];

let deck: Card[] = [
  {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }
];


export default function Board(props: any) {
  const [gameState, setGameState] = useState<GameState>(
    props.gameState || { playerStates: [], deck: [], nursery: [], discardPile: [], selectedCard: null }
  );

  let myState = gameState.playerStates.find(playerState => {return playerState.name === props.myName})
    || {stable: [], hand: []};
  let opponentStates = gameState.playerStates.filter(state => { return state.name != props.myName});

  useEffect(() => {
    socket.on('gameState', (newState: GameState) => {
      setGameState(newState);
    });
  }, [1]);

  return (
      <div className="board">
        <CardsOverlay/>
        <Opponents opponentStates={opponentStates} selectedCard={gameState.selectedCard} key={opponentStates}/>
        <div className="decks">
          <Deck cards={nursery} deckType="nursery"/>
          <Deck cards={deck} deckType="deck"/>
          <Deck cards={gameState.discardPile} cardsDisplayed={10} chaos={20} useOffset={true} deckType="discardPile"/>
        </div>
        <div>
          <Stable cards={myState.stable} isSelf={true} selectedCard={gameState.selectedCard} playerName={props.myName}/>
          <Hand cards={myState.hand} selectedCard={gameState.selectedCard}/>
        </div>
      </div>
  );
}
