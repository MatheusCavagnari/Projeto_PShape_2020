import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'
import api from '../../../services/api'

import './styles.css'

export default function Agenda() {


  const [agendamentos, setAgendamentos] = useState([]) 

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
    agendamentosBanco()
  }, [])

  function clicarData(arg) {
    console.log(arg)
    alert(arg.dateStr)
  }

  function ListaAgendamentosDia(arg) {
    arg.jsEvent.preventDefault()
    console.log(arg.event.url)
  }

  return (
    <div id="page">
      <Header className="header" />
      <Menu page="4"/>
      <div className="main"> 
        <Titulo
          titulo="Agenda"
          textoBotao="Adicionar"
          classBotao="hidden"
          // btnClick={btnAdicionarClick}
        />
        <div className="calendario">
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            dateClick={clicarData}
            contentHeight="auto"
            locale="PT-BR"
            buttonText={{today: "Hoje"}}
            events={agendamentos}
            dayMaxEventRows="1"
            eventClick={ListaAgendamentosDia}
          />
        </div>
      </div>
      <Footer className="footer"/>
    </div>
  )
} 