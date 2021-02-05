import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './component/Home/Home';
import Treino from './component/Treino/Treino';
import Menu from './component/Menu/Menu';


export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/treino" component={Treino} />
      <Route path="/menu" component={Menu} />
    </Router>
  );
}