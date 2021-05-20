import React from 'react';
import Menu from '../../Menu'
import { Chart } from 'react-google-charts'
import './styles.css';

import Header from '../../Header';
import Footer from '../../Footer';
import BotaoIcone from '../../BotaoIcone'
import Titulo from '../../Titulo'


function Home() {
    return (
        <div id="page">
            <Header />
            <Menu page="0" />
            <div className="home">
                <div className="meio">


                </div>

            </div>
            <Footer className="footer" />
        </div>
    );
}

export default Home;