import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './component/Pages/Home/Home';
import Treino from './component/Pages/Treino/Treino';
import Exercicio from './component/Pages/Exercicio/Exercicio';
import Avaliacao from './component/Pages/Avaliacao/Avaliacao';
import Menu from './component/Menu/Menu';


export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/treino" component={Treino} />
      <Route path="/menu" component={Menu} />
      <Route path="/exercicio" component={Exercicio} />
      <Route path="/avaliacao" component={Avaliacao} />
    </Router>
  );
}