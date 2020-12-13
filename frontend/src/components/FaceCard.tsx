import React, { useState } from 'react';
import socket from '../context/socket';
import './FaceCard.css'

type CardProps = {
    onClick?: any;
}

export function CardFace( props: CardProps | any ) {
    const [position, setPosition] = useState(generatePosition(props.chaos))

    function destroyCard(e: any) {
        e.preventDefault();
        socket.emit('targetCard', props.uid);
    }

    function stealCard(e: any) {
        socket.emit('stealCard', props.uid);
    }

    let rotation: number = position.rotation;
    let offset: number = position.offset;

    function generatePosition(chaos: number | undefined) {
        if (!chaos) return {rotation: 0, offset: 0}
        let rotation = (Math.random() * (chaos*2) - chaos);
        let offset = props.useOffset ? (Math.random()*chaos*2 - chaos) : 0;
        return {rotation: rotation, offset: offset};
    }

    return(
        <img
            data-uid={props.uid}
            className="card"
            onClick={props.onClick || stealCard}
            onContextMenu={destroyCard}
            src={'../cards/' + props.id + '.jpg'} alt={props.id}
            style={props.chaos ? { transform: 'rotate('+rotation+'deg) translate('+offset+'px,'+offset+'px)'} : {}}/>
    )
}