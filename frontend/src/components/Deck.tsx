import React, { useEffect } from 'react';
import { Card, CardType } from '../context/models';
import socket from '../context/socket';
import './Deck.css'
import { CardFace } from './FaceCard';

type DeckProps = {
    cards?: Card[];
    cardsDisplayed: number;
    chaos?: number;
    useOffset?: boolean;
    deckType?: string;
    myName: string;
}

type Position = {
    rotation: number;
    offset: number;
}

let nurseryCards: Card[] = [
    {id: 'Baby Back', type: CardType.INSTANT }, {id: 'Baby Back', type: CardType.INSTANT }
  ];
  
  let deckCards: Card[] = [
    {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }, {id: 'Back', type: CardType.INSTANT }
  ];

export function Deck( props: DeckProps) {

    let chaos = props.chaos || 10;
    let numToDisplay = props.cardsDisplayed;
    let cards: Card[] | undefined = [];
    if (props.deckType != "discardPile") cards = (props.deckType == "nursery") ? nurseryCards : deckCards;
    else cards = props.cards;
    let displayedCards = cards?.slice(0, numToDisplay);

    useEffect(() => {
        socket.on('drawAnimation', (playerName: string) => {
            
        });
    }, [1])

    function doNothing() {
        // Cancel out normal onClick of card
    }

    function search(e: any) {
        e.preventDefault();
        socket.emit('search', props.deckType);
    }

    function draw() {
        socket.emit('draw', props.deckType);
    };

    let deck = cards?.length ? (
        <div className="deck" onClick={draw}>
        {displayedCards?.map((card: Card, index) => {
            return (
                <div className="animation-container" key={card.uid} onContextMenu={search}>
                    <CardFace onClick={doNothing} onContextMenu={doNothing} id={card.id} chaos={chaos} useOffset={props.useOffset}/>
                </div>
            );
        })}
    </div>) : <></>

    return deck;
}