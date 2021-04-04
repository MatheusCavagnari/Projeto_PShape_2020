import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert2'

import Header from '../../Header'
import Footer from '../../Footer'

import './styles.css'
import { TextField } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import api from '../../../services/api'

function EditarExercicio() {
    const [nome, setNome] = useState('');
    const [maquina, setMaquina] = useState('');
    const [tipo, setTipo] = React.useState('');
    const personal_id = 1;

    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    const { id } = useParams();
    
    useEffect(() =>  {
        const bancoBusca = async () => {
            await api.get(`/exercicio/${id}`, { headers: { personal: personal_id } })
                .then(response => {
    
                    setNome(response.data[0]?.nome);
                    setMaquina(response.data[0]?.maquina);
                    setTipo(response.data[0]?.tipo);
                })
                .catch(err => {
                    console.log(err)
                })
        }

        bancoBusca();             

    }, [id])

    async function btnAddExercicio(e) {
        e.preventDefault()

        console.log(nome);
        console.log(personal_id);
        console.log(maquina);
        console.log(tipo);

        try {
            axios({
                url: `http://localhost:3333/exercicio/${id}`,
                method: 'put',
                data: {
                    nome,
                    maquina,
                    tipo
                }, 
            })


            swal.fire(
                'Alterado!',
                'Sua Exercicio foi alterado com sucesso.',
                'success'
              ).then(async (result) => {
                if(result.isConfirmed) {
                    history.push('/exercicio')
                }
            })

           
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


    return  (
        <div id="pageAlt">
            <Header classname="header" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Editar Exercício</h2>
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
                            <button>Salvar</button>

                            <button onClick={cancelar} className="cancel">Cancelar</button>
                        </div>
                    </form>
                   
                </div>
            </div>
            <Footer classname="footer" />
        </div>
    )
}

export default EditarExercicio