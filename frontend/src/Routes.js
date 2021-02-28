import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './component/Pages/Home'; 
import Aluno from './component/Pages/Aluno'; 
import Treino from './component/Pages/Treino';
import Exercicio from './component/Pages/Exercicio';
import Avaliacao from './component/Pages/Avaliacao';
import Menu from './component/Menu';
import Login from './component/Pages/Login'
import Cadastro from './component/Pages/Cadastro'
import AlterarUsuario from './component/Pages/AlterarUsuario' 
import CadastroAluno from './component/Pages/CadastroAluno' 


export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/aluno" component={Aluno} />
      <Route path="/treino" component={Treino} />
      <Route path="/menu" component={Menu} />
      <Route path="/exercicio" component={Exercicio} />
      <Route path="/avaliacao" component={Avaliacao} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/alterarUsuario" component={AlterarUsuario} /> 
      <Route path="/cadastroAluno" component={CadastroAluno} /> 
    </Router>
  );
}