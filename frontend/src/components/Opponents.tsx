import React, { useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { Hand } from './Hand';
import './Opponents.css'
import { Stable } from './Stable';

export function Opponents(props: any) {
    const [selectedOpponent, setSelectedOpponent] = useState("");

    if (props.opponentStates.length > 0
        && !selectedOpponent) setSelectedOpponent(props.opponentStates[Math.floor(props.opponentStates.length/2)].name);

    let opponentState = props.opponentStates.find((state:any) => state.name == selectedOpponent)
                        || {cards: [], name: "", hand: []};

    return(
        <div>
            <SwitchTransition>
                <CSSTransition classNames="opponent-board" timeout={200} key={opponentState.name}>
                    <div className="opponent-board">
                        <Stable cards={opponentState.stable} isSelf={false} selectedCard={props.selectedCard} playerName={opponentState.name}/>
                        <Hand hideHand={true} isOpponent={true} cards={opponentState.hand} selectedCard={props.selectedCard}/>
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <div className="opponent-name-container">
                {props.opponentStates.map((eachState: any) => {
                    return (
                        <div
                        className={eachState.name == opponentState.name ? 'selected':''}
                        onMouseOver={() => setSelectedOpponent(eachState.name)}>
                            {eachState.name}
                        </div>);
                    })
                }
            </div>
        </div>
    );
}