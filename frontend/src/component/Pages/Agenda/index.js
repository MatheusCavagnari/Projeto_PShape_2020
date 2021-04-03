import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';

import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'
import api from '../../../services/api'

import './styles.css'

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
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Agenda() {

  const [open, setOpen] = React.useState(false);
  const [agendamentos, setAgendamentos] = useState([])
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [data, setData] = useState({})
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({})
  const [tipo, setTipo] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [horario, setHoaraio] = useState("")


  const tipos = [{
    title: "Avaliação",
    value: "A"
  },{
    title: "Treino",
    value: "T"
  }]

  const handleClose = () => {
    setOpen(false);
  };

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
        <div className="horzBox">
          <label htmlFor="horarioAgned">Horário</label>
          <TextField id="horarioAgned" type="time" onChange={e => setHoaraio(e.target.value)}></TextField>
        </div>
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
    const dataHora = data.data + ' ' + horario
    const final = {
      tipo,
      observacoes,
      aluno_id: aluno.id,
      data_hora_execucao: null,
      data_hora_agendamento: dataHora
    }

    try{
      await api.post('/agendamento', final, {headers: { personal: localStorage.getItem('personal') }})
      alert(`Agendamento cadastrado com sucesso!`)

      handleClose()
    }catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }
  }


  useEffect(() => {
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
    listAluno()
    agendamentosBanco()
  }, [agendamentos])

  function clicarData(arg) {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let dataClick = new Date(arg.dateStr);
    let dataFormatada = (((dataClick.getDate() + 1) + " " + meses[(dataClick.getMonth())] + " " + dataClick.getFullYear()));
    const dataObj = {
      data: arg.dateStr,
      dataFormat: dataFormatada
    }
    setData(dataObj)
    setOpen(true)
  }

  function ListaAgendamentosDia(arg) {
    arg.jsEvent.preventDefault()
    alert(arg.event.url)
  }

  return (
    <div id="page">
      <Header className="header" />
      <Menu page="4" />
      <div className="main">
        <Titulo
          titulo="Agenda"
          textoBotao="Adicionar"
          classBotao="hidden"
        // btnClick={btnAdicionarClick}
        />
        <div className="calendario">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={clicarData}
            contentHeight="auto"
            locale="PT-BR"
            buttonText={{ today: "Hoje" }}
            events={agendamentos}
            dayMaxEventRows="1"
            eventClick={ListaAgendamentosDia}
          />
        </div>
      </div>
      <Footer className="footer" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}