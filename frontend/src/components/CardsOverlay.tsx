import './CardsOverlay.css'
import { useEffect, useState } from "react";
import { Card } from "../context/models";
import socket from "../context/socket";
import { CardFace } from './FaceCard';


export function CardsOverlay() {
    const [cards, setCards] = useState<Card[] | null>(null);

    useEffect(() => {
        socket.on('choices', (choices: Card[]) => {
            setCards(choices);
        })
    }, [1]);

    function choose(e: any) {
        socket.emit('choose', e.target.dataset.uid);
        setCards(null);
    }

    return (
        <div className="overlay" style={cards ? {display: "flex"}:{}}>
            {cards?.map((card: Card) => 
                <div className="cardContainer">
                    <CardFace id={card.id} uid={card.uid} onClick={choose} />
                </div>
            )}
        </div>
    );
}