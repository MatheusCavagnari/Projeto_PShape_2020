import React from "react";
import {useHistory} from 'react-router-dom' 

import './styles.css'

function BotaoIcone(props) {
  const history = useHistory()
  return (
    <>
    <div className="card1">
      <button onClick={() => history.push(props.path)}>
          <img src={props.icone} alt={props.nome} />
          <p id="subtitulo"> {props.nome}</p>
      </button>
      </div>
    </>
  );
}

export default BotaoIcone;
