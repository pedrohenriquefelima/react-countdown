import { useRef, useState } from "react";

export default function Player() {

  const [playerNameText, setPlayerNameText] = useState();
  const playerName = useRef();

  function submitNameHandler(event){
    //just want to read something
    setPlayerNameText(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerNameText ?? 'unknown entity'}</h2>
      <p>
        <input type="text" ref={playerName}/>
        <button onClick={submitNameHandler}>Set Name</button>
      </p>
    </section>
  );
}
