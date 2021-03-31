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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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


  const handleClose = () => {
    setOpen(false);
  };

  let body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Cadastro de Agendamento</h2>
      <h2 id="simple-modal-title">{data.dataFormat}</h2>
      <Autocomplete
        id="combo-box-demo"
        options={alunos}
        getOptionLabel={(option) => option.nome}
        style={{ width: "100%" }}
        noOptionsText="Sem opções"
        renderInput={(params) => <TextField {...params} label="Aluno" />}
        // onChange={selecionaAluno}
      />
      <Autocomplete
        id="combo-box-demo"
        options={[{
          title: "Avaliação",
          value: "A"
        },{
          title: "Treino",
          value: "T"
        }]}
        getOptionLabel={(option) => option.title}
        style={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Tipo agendamento" />}
        // onChange={selecionaAluno}
      />
      <label htmlFor="horarioAgned">Horário</label>
      <TextField id="horarioAgned" type="time"></TextField>
      <TextField multiline variant="outlined" placeholder="Observações"></TextField>
      <button>Cadastrar</button>
      <button>Cancelar</button>
    </div>
  );

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
  }, [])

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