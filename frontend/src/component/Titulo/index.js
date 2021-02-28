import React from 'react'

import './styles.css'

function Titulo(props) {
  return (
    <div className="title">
      <div className="mainTitle">
        <h1 id="title">{props.titulo}</h1>
        <button 
          className={props.classBotao} 
          onClick={props.btnClick}
        >
            {props.textoBotao}
        </button>
      </div>
      <div className="line"></div>
    </div>
  )
}

export default Titulo