import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './component/Pages/Home'; 
import Agenda from './component/Pages/Agenda'; 
import Aluno from './component/Pages/Aluno'; 
import Treino from './component/Pages/Treino';
import Exercicio from './component/Pages/Exercicio';
import Avaliacao from './component/Pages/Avaliacao';
import Menu from './component/Menu';
import Login from './component/Pages/Login'
import Cadastro from './component/Pages/Cadastro'
import AlterarUsuario from './component/Pages/AlterarUsuario' 
import CadastroAluno from './component/Pages/CadastroAluno' 
import CadastroTreino from './component/Pages/CadastroTreino' 
import CadastroExercicio from './component/Pages/CadastroExercicio' 
import Relatorio from './component/Pages/Relatorio' 
import CadastroAvaliacao from './component/Pages/CadastroAvaliacao' 
import EditarExercicio from './component/Pages/EditarExercicio' 
import AlterarAluno from './component/Pages/AlterarAluno' 


export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/aluno" component={Aluno} />
      <Route exact path="/agenda" component={Agenda} />
      <Route path="/treino" component={Treino} />
      <Route path="/menu" component={Menu} />
      <Route path="/exercicio" component={Exercicio} />
      <Route path="/avaliacao" component={Avaliacao} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/alterarUsuario" component={AlterarUsuario} /> 
      <Route path="/cadastroAluno" component={CadastroAluno} /> 
      <Route path="/cadastroTreino" component={CadastroTreino} />
      <Route path="/cadastroExercicio" component={CadastroExercicio} />
      <Route path="/relatorio" component={Relatorio} />
      <Route path="/cadastroAvaliacao" component={CadastroAvaliacao} />
      <Route path="/editarExercicio" component={EditarExercicio} />
      <Route path="/editarAluno" component={AlterarAluno} />
    </Router>
  );
}