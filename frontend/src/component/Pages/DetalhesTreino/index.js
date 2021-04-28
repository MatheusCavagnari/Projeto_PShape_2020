import React from 'react'


import Menu from '../../Menu';
import Footer from '../../Footer';
import Header from '../../Header';
import Titulo from '../../Titulo';

import "./styles.css";

function DetalhesTreino() {
  return (
    <div id="page">
      <Header className="header" />
      <Menu page="2"/>
      <div className="main">
        <Titulo
          titulo="Detalhes Treino - Nome - Aluno"
          classBotao="hidden"
        />
        <table>
          <thead></thead>
        </table>
      </div>
      <Footer/>
    </div>
  )
}

export default DetalhesTreino;