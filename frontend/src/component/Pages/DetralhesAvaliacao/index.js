import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'
import './styles.css'


import { TextField } from '@material-ui/core'

import api from '../../../services/api'

function DetalhesAvaliacao() {
    const [ aluno_id, setAluno] = useState('');
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
    const personal_id = 1;
   
    const [alunos, setAlunos] = useState([]);


    const history = useHistory();

    const { id } = useParams();
    const bancoBusca = async () => {
        await api.get(`/avaliacao/${id}` )
            .then(response => {
                setAltura(response.data[0]?.altura)
                setAbdominal(response.data[0]?.dobra_abdominal)
                setAxilar(response.data[0]?.dobra_axilar)
                setBiciptal(response.data[0]?.dobra_bicipal)
                setCoxa(response.data[0]?.dobra_coxa)
                setPanturrilha(response.data[0]?.dobra_panturrilha)
                setSubescapular(response.data[0]?.dobra_subescapular)
                setSupraIliaca(response.data[0]?.dobra_supra_iliaca)
                setToracica(response.data[0]?.dobra_toracica)
                setTricipal(response.data[0]?.dobra_tricipal)
                setPeso(response.data[0]?.peso)
                setData(response.data[0]?.data_avaliacao)
                setAluno(response.data[0]?.aluno_id)

               
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        bancoBusca()
    }, [])
    
    function cancelar(e) {
      e.preventDefault()
      history.push('/avaliacao')
    }
    


      function selecionaAluno(e) {
        const abc = e.target.id;
        const index = abc.slice(22);
        if(index){
            setAluno(alunos[parseInt(index)].id)
          } else {
            setAluno([])
          }
    }


    return (
        <div id="page">
            <Header classname="header" />
            <Menu page="1" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Detalhes Avaliação</h2>
                    
                   
                    <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Altura"
                                name="altura"
                                required
                                value={altura}
                                onChange={e => setAltura(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Peso "
                                name="peso"
                                required
                                value={peso}
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
                                label="Dobra Abdominal"
                                name="abdominal"
                                required
                                value={dobra_abdominal}
                                onChange={e => setAbdominal(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Axilar "
                                name="axilar"
                                required
                                value={dobra_axilar}
                                onChange={e => setAxilar(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Biciptal"
                                name="biciptal"
                                required
                                value={dobra_bicipal}
                                onChange={e => setBiciptal(e.target.value)}
                            />

                        </div>
                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra da Coxa"
                                name="coxa"
                                required
                                value={dobra_coxa}
                                onChange={e => setCoxa(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Panturrilha"
                                name="panturrilha"
                                required
                                value={dobra_panturrilha}
                                onChange={e => setPanturrilha(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Subescapular"
                                name="subescapular"
                                required
                                value={dobra_subescapular}
                                onChange={e => setSubescapular(e.target.value)}
                            />
                        </div>

                        <div className="horizontalBox">
                            <TextField id="standard-basic nome"
                                label="Dobra Supra-ilíaca"
                                name="supraIliaca"
                                required
                                value={ dobra_supra_iliaca}
                                onChange={e => setSupraIliaca(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Torácica"
                                name="toracica"
                                required
                                value={dobra_toracica}
                                onChange={e => setToracica(e.target.value)}
                            />
                            <TextField id="standard-basic nome"
                                label="Dobra Tricipal"
                                name="tricipal"
                                required
                                value={dobra_tricipal}
                                onChange={e => setTricipal(e.target.value)}
                            />
                        </div>
                        <div className="horizontalBox buttons">
                            <button onClick={cancelar} className="cancel">Cancelar</button>
                        </div>

                </div>
            </div>
            <Footer classname="footer" />
        </div>
    )
}

export default DetalhesAvaliacao