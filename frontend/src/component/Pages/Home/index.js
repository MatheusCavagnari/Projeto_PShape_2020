import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../../Menu'
import './styles.css';
import 'date-fns';

import { useParams } from 'react-router-dom';
import swal from 'sweetalert2'
import { Chart } from 'react-google-charts'

import api from '../../../services/api'
import Header from '../../Header';
import Footer from '../../Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function Home() {
    const [quantidade, setQtd] = useState(0);
    const { id } = useParams()
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = React.useState(false);
    const [agendamentos, setAgendamentos] = useState([]);

    const [data, setData] = useState({})
    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState({})
    const [tipo, setTipo] = useState("")
    const [observacoes, setObservacoes] = useState("")
    const [horario, setHoaraio] = useState("")


    const handleClose = () => {
        setOpenModal(false);
    };


    const tipos = [{
        title: "Avaliação",
        value: "A"
    }, {
        title: "Treino",
        value: "T"
    }]

    function selecionaAluno(e) {
        const abc = e.target.id;
        const index = abc.slice(22);
        if (index) {
            setAluno(alunos[parseInt(index)])
        } else {
            setAluno([])
        }
    }

    function selecionaTipo(e) {
        const abc = e.target.id;
        const index = abc.slice(23);
        if (index) {
            setTipo(tipos[parseInt(index)].value)
        } else {
            setAluno([])
        }
    }



    let body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="modalBox">
                <div className="tituloBox">
                    <h2>Cadastro de Agendamento</h2>
                    <h2 id="simple-modal-title">{data.dataFormat}</h2>
                </div>
                <Autocomplete
                    id="combo-box-demo"
                    options={alunos}
                    getOptionLabel={(option) => option.nome}
                    getOptionSelected={(option, value) => option.id === value.id}
                    style={{ width: "100%" }}
                    noOptionsText="Sem opções"
                    renderInput={(params) => <TextField {...params} label="Aluno" />}
                    onChange={selecionaAluno}
                />
                <Autocomplete
                    id="combo-box-demo-"
                    options={tipos}
                    getOptionLabel={(option) => option.title}
                    getOptionSelected={(option, value) => option.value === value.value}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Tipo agendamento" />}
                    onChange={selecionaTipo}
                />
                <TextField
                    id="datetime-local"
                    label="Data e hora"
                    type="datetime-local"
                    className={classes.textField}
                    onChange={e => setHoaraio(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <TextField
                    multiline
                    variant="outlined"
                    placeholder="Observações"
                    className="txtArea"
                    onChange={e => setObservacoes(e.target.value)}
                />
                <div className="horzBox">
                    <button className="button" onClick={cadastroAgendamento}>Cadastrar</button>
                    <button className="btnCancelar" onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );

    async function cadastroAgendamento(e) {
        e.preventDefault()



        const final = {
            tipo,
            observacoes,
            aluno_id: aluno.id,
            data_hora_execucao: null,
            data_hora_agendamento: horario
        }

        try {
            await api.post('/agendamento', final, { headers: { personal: localStorage.getItem('personal') } })

            swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Seu agendamento foi adicionado.',
                showConfirmButton: false,
                timer: 1500
            })


            listAluno()
            agendamentosBanco()
            handleClose()
        } catch (err) {
            alert(`Aconteceu algum erro ${err.response.data}`)
            console.log(err)
        }
    }



    const agendamentosBanco = async () => {
        await api.get('/agendamento', { headers: { personal: localStorage.getItem('personal') } })
            .then(response => {
                setAgendamentos(response.data)

            })
            .catch(err => {
                console.log(err)
            })
    }
    const listAluno = async () => {
        await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
            .then(response => {
                setAlunos(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {

        const alunoQtd = async () => {
            await api.get(`/alunosQtd/${id}`, { headers: { personal: localStorage.getItem('personal') } })
                .then(responseAluno => {
                    console.log("deu" + responseAluno.data)
                    var qtd = responseAluno.data;
                    setQtd(qtd);
                    //console.log("Matheus" + responseAluno.data[0])

                })
                .catch(err => {
                    console.log("não")
                    console.log(err)
                })
        }
        alunoQtd();
        listAluno();

    }, [])

    function agendar() {
        setOpenModal(true)
    }

    return (
        <div id="page">
            <Header />
            <Menu page="0" />
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div></div>
                    </Grid>
                    <Grid item xs>
                        <div></div>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color="primary" onClick={() => agendar()}>Agendar aluno</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>{quantidade}  </div>
                        <div>Alunos Ativo</div>

                    </Grid>
                    <Grid item xs>
                        <div>Aulas Agendadas</div>
                    </Grid>
                    <Grid item xs>
                        <div>Número total de Alunos (Grafico)</div>
                    </Grid>
                </Grid>
            </Container>

            <Footer className="footer" />
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default Home;