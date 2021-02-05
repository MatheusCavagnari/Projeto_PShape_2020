import React from 'react';
import User from '../../../img/Group.svg';
import Vetor from '../../../img/Vector.svg';
import Footer from '../../Footer/Footer';
import Braco from '../../../img/braco.svg';
import Peso from '../../../img/peso.svg';
import Agenda from '../../../img/agenda.svg';


import './Home.css';

function Home() {
    return (
        <>
            <div className="home">
                <div className="container"><h1 id="title">Seja bem vindo!</h1></div>
                <div className="meio">
                    <div className="card1">
                        <div>
                            <a href="./"><img src={User} alt="some text" /></a>
                            <p id="subtitulo"> Aluno</p>
                        </div>
                    </div>
                    <div className="card1">
                        <div>
                            <a href="./"><img src={Vetor} alt="some text" /></a>
                            <p id="subtitulo"> Avaliação</p>
                        </div>
                    </div>
                    <div className="card1">
                        <div>
                            <a href="./treino"><img src={Braco} alt="some text" /></a>
                            <p id="subtitulo"> Treino</p>
                        </div>
                    </div>
                    <div className="card1">
                        <div>
                            <a href="./exercicio"><img src={Peso} alt="some text" /></a>
                            <p id="subtitulo"> Execícios</p>
                        </div>
                    </div>
                    <div className="card1">
                        <div>
                            <a href="./"><img src={Agenda} alt="some text" /></a>
                            <p id="subtitulo"> Agenda</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
}

export default Home;