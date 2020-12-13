import './Stable.css'
import React from 'react';
import { CardFace} from './FaceCard';
import { Card, CardType } from '../context/models';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PlaceHolder } from './PlaceHolder';

type StableProps = {
    cards: Card[];
    playerName: string;
    isSelf: boolean;
    selectedCard: Card | null;
}

export function Stable(props: StableProps) {

    let downgradePlaceholder = false;
    let upgradePlaceholder = false;
    if (props.selectedCard && props.selectedCard.type === CardType.DOWNGRADE) downgradePlaceholder = true;
    if (props.selectedCard && props.selectedCard.type === CardType.UPGRADE) upgradePlaceholder = true;

    let downgradeCardElements: any = [];
    let upgradeCardElements: any = [];
    let unicornCardElements: any = [];

    // Sort cards for respective piles
    if (props.cards) {
        unicornCardElements = generateCardElements([CardType.BABY_UNICORN, CardType.BASIC_UNICORN, CardType.MAGICAL_UNICORN]);
        upgradeCardElements = generateCardElements([CardType.UPGRADE]);
        downgradeCardElements = generateCardElements([CardType.DOWNGRADE]);

        function generateCardElements(types: CardType[]) {
            return  props.cards.flatMap((card: Card) => {
                if (types.includes(card.type))
                    return [
                    <CSSTransition classNames="stable-card" timeout={700} key={card.uid}>
                        <CardFace id={card.id} name={card.name} type={card.type} uid={card.uid}/>
                    </CSSTransition>];
                else return [];
            });
        }

    }
 
    return(
        <div className={(props.isSelf) ? 'stable self':'stable'}>
            <TransitionGroup /*style={{display: (downgradeCardElements.length || props.selectedCard) ? "":"none" }}*/>
                {downgradeCardElements}
                {downgradePlaceholder ? <PlaceHolder playerName={props.playerName}/> : <></>}
            </TransitionGroup>
            <TransitionGroup >
                {unicornCardElements}
            </TransitionGroup>
            <TransitionGroup>
                {upgradeCardElements}
                {upgradePlaceholder ? <PlaceHolder playerName={props.playerName}/> : <></>}
            </TransitionGroup>
        </div>
    );
}