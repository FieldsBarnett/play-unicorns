import './Lobby.css';
import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import socket from '../context/socket';

export default function Lobby(props: any) {
  const [players, setPlayers] = useState<String[]>([]);
  const [warning, setWarning] = useState<String>("");
  let nameInput: any = React.createRef();

  useEffect(() => {
    socket.on('players', (players: string[]) => {
      console.log('players', players);
      setPlayers(players);
    });
    socket.on('badName', (reason: string) => {
      props.setName("");
      setWarning(reason);
    });
    socket.on('badStart', (reason: string) => {
      setWarning(reason);
    });
  }, [1]);

  function join() {
    console.log('join');
    let input = nameInput.current.value.toUpperCase()
    socket.emit('join', input);
    // Client side check first so we don't set state when not necessary
    if (!players.includes(input)) props.setName(input);
    nameInput.current.value = props.name;
    setWarning("");
  }
  function start() {
    socket.emit('start');
  }

  let control = players.includes(props.name) ? (
    <CSSTransition timeout={300} key="start">
      <button className="start" onClick={start}>Everyone's Here</button>
    </CSSTransition>
  ) : (
    <CSSTransition timeout={300} key="join">
      <div className="nameControl">
        <input placeholder="Your Name" ref={nameInput}/>
        <button className="join" onClick={join}>Join</button>
      </div>
    </CSSTransition>
  );

  return (
    <div className="lobby">
      <div className="controls">
      {warning ? <div className="warning">{warning}</div> : <></>}
        <SwitchTransition>
            {control}
        </SwitchTransition>
      </div>
      <TransitionGroup className="namesContainer">
        {players.map((playerName: any) => {
          return (
          <CSSTransition timeout={300} classNames="playerName" key={playerName}>
            <div>{playerName}</div>
          </CSSTransition>)
        })}
      </TransitionGroup>
    </div>
  );
}
