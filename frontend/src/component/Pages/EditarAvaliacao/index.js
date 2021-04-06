import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'
import './styles.css'
import swal from 'sweetalert2'

import { TextField } from '@material-ui/core'

import api from '../../../services/api'

function EditarAvaliacao() {
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


    const history = useHistory();
    const { id } = useParams();

       
    const [alunos, setAlunos] = useState([]);
    
    useEffect(() => {
        
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
                    
                    
                    const alunoSel = async () => {
                        await api.get(`/alunos/${response.data[0]?.aluno_id}`, { headers: { personal: localStorage.getItem('personal') } })
                          .then(responseAluno => {
                            setAlunos(responseAluno.data[0]?.nome);
                            console.log(responseAluno.data[0]?.nome)
                            document.getElementById("nomeAluno").innerHTML = 'Nome: ' + responseAluno.data[0]?.nome;
    
                            //setAluno(response.data[0]?.aluno_id)
                          })
                          .catch(err => {
                            console.log(err)
                          })
                      }
                      alunoSel();

                })
                .catch(err => {
                    console.log(err)
                })
        }

        bancoBusca()
    }, [id])
    
    function cancelar(e) {
      e.preventDefault()
      history.push('/avaliacao')
    }
    
    async function btnAddAvalicao(e) {
        e.preventDefault()

        try{
            await api.put(`/avaliacao/${id} `, {
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

            swal.fire(
                'Editado!',
                'Sua Avaliação foi editada com sucesso.',
                'success'
              ).then(async (result) => {
                if(result.isConfirmed) {
                    history.push('/avaliacao')
                }
            })
      
           
          } catch (err) {
            alert(`Aconteceu algum erro ${err.response.data}`)
            console.log(err)
          }

        }


    return (
        <div id="page">
            <Header classname="header" />
            <Menu page="1" />
            <div className="main">
                <div className="boxAlt">
                    <h2>Editar Avaliação</h2>
                    <form onSubmit={btnAddAvalicao}>

                    <div classname="horizontalBox">
                        <h3  id="nomeAluno">  </h3>
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
                                label="D Subescapular (mm)"
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
                                value={ dobra_supra_iliaca}
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
                                label="Dobra Tricipal (mm)"
                                name="tricipal"
                                required
                                value={dobra_tricipal}
                                type="number"
                                onChange={e => setTricipal(e.target.value)}
                            />
                        </div>
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

export default EditarAvaliacao