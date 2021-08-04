import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'
import './styles.css'
import swal from 'sweetalert2'

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

import api from '../../../services/api'

function CadastroAvaliacao() {
    const [aluno_id, setAluno] = useState('');
    const [dobra_abdominal, setAbdominal] = useState('');
    const [dobra_axilar, setAxilar] = useState('');
    const [dobra_bicipal, setBiciptal] = useState('');
    const [dobra_coxa, setCoxa] = useState('');
    const [dobra_panturrilha, setPanturrilha] = useState('');
    const [dobra_subescapular, setSubescapular] = useState('');
    const [dobra_supra_iliaca, setSupraIliaca] = useState('');
    const [dobra_toracica, setToracica] = useState('');
    const [dobra_tricipal, setTricipal] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [data_avaliacao, setData] = useState('');


    const [alunos, setAlunos] = useState([]);


    const history = useHistory();


    useEffect(() => {

        const avalAluno = async () => {
            await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
                .then(response => {
                    setAlunos(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        avalAluno()
    }, [])

    function cancelar(e) {
        e.preventDefault()
        history.push('/avaliacao')
    }



    async function btnAddAvalicao(e) {
        e.preventDefault()

        try {
            await api.post(`/avaliacao?aluno=${aluno_id} `, {
                peso,
                altura,
                dobra_tricipal,
                dobra_bicipal,
                dobra_toracica,
                dobra_panturrilha,
                dobra_abdominal,
                dobra_coxa,
                dobra_subescapular,
                dobra_supra_iliaca,
                dobra_axilar,
                data_avaliacao,
            })

            swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Avaliação foi adicionada com sucesso.',
                showConfirmButton: false,
                timer: 1500
            }).then(async (result) => {

                history.push('/avaliacao')

            })


        } catch (err) {
            alert(`Aconteceu algum erro ${err.response.data}`)
            console.log(err)
        }

    }

    function selecionaAluno(e) {
        const abc = e.target.id;
        const index = abc.slice(22);
        if (index) {
            setAluno(alunos[parseInt(index)].id)
        } else {
            setAluno([])
        }
    }


    return (
        <div id="page">
            <Header classname="header" />
            <Menu page="2" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Cadastro de Avaliação</h2>
                    <form onSubmit={btnAddAvalicao}>
                        <div >
                            <Autocomplete
                                id="combo-box-demo"
                                options={alunos}
                                getOptionLabel={(option) => option.nome}

                                renderInput={(params) => <TextField {...params} label="Aluno*" variant="outlined" />}
                                onChange={selecionaAluno}
                            />
                        </div>

                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Altura (m)"
                                name="altura"
                                required
                                value={altura}
                                type="number"
                                onChange={e => setAltura(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Peso (Kg)"
                                name="peso"
                                required
                                value={peso}
                                type="number"
                                onChange={e => setPeso(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Data"
                                name="data"
                                required
                                value={data_avaliacao}
                                onChange={e => setData(e.target.value)}
                                type="date"

                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>
                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra Abdominal (mm)"
                                name="abdominal"
                                required
                                value={dobra_abdominal}
                                type="number"
                                onChange={e => setAbdominal(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Axilar (mm)"
                                name="axilar"
                                required
                                value={dobra_axilar}
                                type="number"
                                onChange={e => setAxilar(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Biciptal (mm)"
                                name="biciptal"
                                required
                                value={dobra_bicipal}
                                type="number"
                                onChange={e => setBiciptal(e.target.value)}
                            />

                        </div>
                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra Coxa (mm)"
                                name="coxa"
                                required
                                value={dobra_coxa}
                                type="number"
                                onChange={e => setCoxa(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Panturrilha (mm)"
                                name="panturrilha"
                                required
                                value={dobra_panturrilha}
                                type="number"
                                onChange={e => setPanturrilha(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="D Subescapular(mm)"
                                name="subescapular"
                                required
                                value={dobra_subescapular}
                                type="number"
                                onChange={e => setSubescapular(e.target.value)}
                            />
                        </div>

                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="D Supra-ilíaca (mm)"
                                name="supraIliaca"
                                required
                                value={dobra_supra_iliaca}
                                type="number"
                                onChange={e => setSupraIliaca(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Torácica (mm)"
                                name="toracica"
                                required
                                value={dobra_toracica}
                                type="number"
                                onChange={e => setToracica(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Tricipal "
                                name="tricipal"
                                required
                                value={dobra_tricipal}
                                type="number"
                                onChange={e => setTricipal(e.target.value)}
                            />
                        </div>
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

export default CadastroAvaliacao