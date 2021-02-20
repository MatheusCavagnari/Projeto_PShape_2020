import React from 'react'

import './styles.css'

function Titulo(props) {
  return (
    <div className="title">
      <h1 id="title">{props.titulo}</h1>
      <div className="line"></div>
    </div>
  )
}

export default Titulo