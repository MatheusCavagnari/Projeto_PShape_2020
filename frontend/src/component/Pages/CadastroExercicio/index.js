import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import Header from '../../Header'
import Footer from '../../Footer'

import './styles.css'
import { TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import swal from 'sweetalert2'

import api from '../../../services/api'

function CadastroExercicio() {
    const [nome, setNome] = useState('');
    const [maquina, setMaquina] = useState('');

    const [tipo, setTipo] = React.useState('female');

    const personal_id = 1;

    const handleChange = (event) => {
        setTipo(event.target.value);
    };


    async function btnAddExercicio(e) {
        e.preventDefault()

        console.log(nome);
        console.log(personal_id);
        console.log(maquina);
        console.log(tipo);

        try {
            axios({
                url: 'http://localhost:3333/exercicio',
                method: 'post',
                data: {
                    nome,
                    maquina,
                    tipo
                }, headers: { personal: personal_id }
            })

            swal.fire(
                'Adicionado!',
                'Seu Exercício foi adicionado com sucesso.',
                'success'
              ).then(async (result) => {
                if(result.isConfirmed) {
                    history.push('/exercicio')
                }
            })
            
            //     // console.log(response.data)
            
        } catch (err) {
            alert(`Aconteceu algum erro ${err.response.data}`)
            console.log(err)
        }

    }

    const history = useHistory();

    function cancelar(e) {
        e.preventDefault()
        history.push('/exercicio')
    }

    return (
        <div id="pageAlt">
            <Header classname="header" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Cadastro de Exercício</h2>
                    <form onSubmit={btnAddExercicio}>
                        <TextField id="standard-basic nome"
                            label="Nome"
                            name="nome"
                            required
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <TextField id="standard-basic nome"
                            label="Máquina"
                            name="maquina"
                            required
                            value={maquina}
                            onChange={e => setMaquina(e.target.value)}
                        />
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={tipo} onChange={handleChange}>
                            <FormControlLabel value="R" control={<Radio />} label="Repetição" />
                            <FormControlLabel value="T" control={<Radio />} label="Tempo" />
                        </RadioGroup>

                        <div className="horizontalBox buttons">
                            <button>Cadastrar</button>
                            <button onClick={cancelar} className="cancel">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer classname="footer" />
        </div>
    )
}

export default CadastroExercicio