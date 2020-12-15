import React, { useEffect } from 'react';
import { Card } from '../context/models';
import socket from '../context/socket';
import './Deck.css'
import { CardFace } from './FaceCard';

type DeckProps = {
    cards: Card[];
    cardsDisplayed?: number;
    chaos?: number;
    useOffset?: boolean;
    deckType?: string;
}

type Position = {
    rotation: number;
    offset: number;
}

export function Deck( props: DeckProps) {

    let chaos = props.chaos || 10;
    let numToDisplay = props.cardsDisplayed || props.cards.length;
    let displayedCards = props.cards.slice(0, numToDisplay);

    useEffect(() => {
        socket.on('drawAnimation', (playerName: string) => {
        });
    }, [1])

    function doNothing() {
        // Cancel out normal onClick of card
    }

    function search() {
        socket.emit('search', props.deckType);
    }

    function draw() {
        socket.emit('draw', props.deckType);
    };

    let deck = props.cards.length ? (
        <div className="deck" onClick={draw}>
        {displayedCards.map((card: Card, index) => {
            return (
                <div className="animation-container" key={card.uid} onContextMenu={search}>
                    <CardFace onClick={doNothing} id={card.id} chaos={chaos} useOffset={props.useOffset}/>
                </div>
            );
        })}
    </div>) : <></>

    return deck;
}