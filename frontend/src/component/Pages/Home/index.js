import React from 'react';

import User from "../../../img/Group.svg";
import Vetor from "../../../img/Vector.svg";
import Braco from "../../../img/braco.svg";
import Peso from "../../../img/peso.svg";
import Agenda from "../../../img/agenda.svg";

import './styles.css';

import Header from '../../Header';
import Footer from '../../Footer';
import BotaoIcone from '../../BotaoIcone'
import Titulo from '../../Titulo'


function Home() {
    return (
        <>
            <Header/> 
            <div className="home">
                <Titulo titulo="Seja bem vindo!" classBotao="hidden" />
                <div className="meio">               
                    <BotaoIcone icone={User} nome="Aluno" path="/aluno" />
                    <BotaoIcone icone={Vetor} nome="Avaliação" path="/avaliacao" />
                    <BotaoIcone icone={Braco} nome="Treino" path="/treino" />
                    <BotaoIcone icone={Peso} nome="Exercícios" path="/exercicio" />
                    <BotaoIcone icone={Agenda} nome="Agenda" path="/" />
                </div>
                <Footer/>
            </div>

        </>
    );
}

export default Home;