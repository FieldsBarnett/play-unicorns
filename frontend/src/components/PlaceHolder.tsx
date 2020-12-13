import React from 'react';
import socket from '../context/socket';
import { CardFace } from './FaceCard';
import './PlaceHolder.css'

export function PlaceHolder( props: any ) {

    function target() {
        socket.emit('targetPlayer', props.playerName);
    }

    return(
        <div className="placeholder" onClick={target}>
            <CardFace id="Back"/>
        </div>
    )
}