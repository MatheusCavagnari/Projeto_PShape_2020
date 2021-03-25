import React, { useState } from 'react'

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'

import './styles.css'
import { TextField } from '@material-ui/core'

function CadastroAvaliacao() {
    const [nome, setNome] = useState('');
    const [abdominal, setAbdominal] = useState('');
    const [axilar, setAxilar] = useState('');
    const [biciptal, setBiciptal] = useState('');
    const [coxa, setCoxa] = useState('');
    const [panturrilha, setPanturrilha] = useState('');
    const [subescapular, setSubescapular] = useState('');
    const [supraIliaca, setSupraIliaca] = useState('');
    const [toracica, setToracica] = useState('');
    const [triciptal, setTriciptal] = useState('');


    return (
        <div id="page">
            <Header classname="header" />
            <Menu page="1" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Cadastro de Avaliacao</h2>
                    <form action="">
                        <TextField id="standard-basic nome"
                            label="Nome"
                            name="nome"
                            required
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra Abdominal"
                                name="abdominal"
                                required
                                value={abdominal}
                                onChange={e => setAbdominal(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Axilar "
                                name="axilar"
                                required
                                value={axilar}
                                onChange={e => setAxilar(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Biciptal"
                                name="biciptal"
                                required
                                value={biciptal}
                                onChange={e => setBiciptal(e.target.value)}
                            />

                        </div>
                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra da Coxa"
                                name="coxa"
                                required
                                value={coxa}
                                onChange={e => setCoxa(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Panturrilha"
                                name="panturrilha"
                                required
                                value={panturrilha}
                                onChange={e => setPanturrilha(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Subescapular"
                                name="subescapular"
                                required
                                value={subescapular}
                                onChange={e => setSubescapular(e.target.value)}
                            />
                        </div>

                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra Supra-ilíaca"
                                name="supraIliaca"
                                required
                                value={supraIliaca}
                                onChange={e => setSupraIliaca(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Torácica"
                                name="toracica"
                                required
                                value={toracica}
                                onChange={e => setToracica(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Triciptal"
                                name="triciptal"
                                required
                                value={triciptal}
                                onChange={e => setTriciptal(e.target.value)}
                            />
                        </div>
                        <div className="horizontalBox buttons">
                            <button>Cadastrar</button>
                            <button className="cancel">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer classname="footer" />
        </div>
    )
}

export default CadastroAvaliacao