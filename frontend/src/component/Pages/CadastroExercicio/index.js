import React, { useState } from 'react'

import Header from '../../Header'
import Footer from '../../Footer'

import './styles.css'
import { TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

function CadastroExercicio() {
    const [nome, setNome] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div id="page">
            <Header classname="header" />
            <div className="main">
                <div className="box">
                    <h2>Cadastro de Exercício</h2>
                    <form action="">
                        <TextField id="standard-basic nome"
                            label="Nome"
                            name="nome"
                            required
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <TextField id="standard-basic nome"
                            label="Máquina"
                            name="observacoes"
                            required
                            value={observacoes}
                            onChange={e => setObservacoes(e.target.value)}
                        />
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="r" control={<Radio />} label="Repetição" />
                            <FormControlLabel value="t" control={<Radio />} label="Tempo" />
                        </RadioGroup>

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

export default CadastroExercicio