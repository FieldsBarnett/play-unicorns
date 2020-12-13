import './Hand.css';
import React from 'react';
import { CardFace } from './FaceCard';
import { Card } from '../context/models';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import socket from '../context/socket';

type HandProps = {
    cards?: Card[];
    selectedCard: Card | null;
    hideHand?: boolean;
    isOpponent?: boolean;
}

export function Hand(props: HandProps) {

    let cards = props.cards || [];
    let selectedCard = props.selectedCard || {uid: null};
    let ownerClass = (props.isOpponent) ? ' opponent' : ' self';

    function playCard(e: any) {
        socket.emit('playFromHand', e.target.dataset.uid);
    }

    // Determine how much cards should overlap
    let overlapLevel = Math.floor(cards.length - 6);
    if (overlapLevel > 3) overlapLevel = 3;

    // Convert props to HandCard components
    let cardComponents = cards.map((card: Card) => {
        return (
            <CSSTransition timeout={350} classNames="handCard" key={card.uid} >
                <div className={card.uid === selectedCard.uid ? "selected":""}>
                    <CardFace
                    id={props.hideHand ? 'BackOldSize' : card.id}
                    uid={card.uid}
                    onClick={props.isOpponent ? null:playCard}/>
                </div>
            </CSSTransition>
        );
    });

    return(
        <TransitionGroup className={'hand overlap' + overlapLevel + ownerClass}>
            {cardComponents}
        </TransitionGroup>
    )
}