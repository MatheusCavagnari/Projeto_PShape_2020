import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'

import './styles.css'

export default function Agenda() {

  function clicarData(arg) {
    alert(arg.dateStr)
  }

  return (
    <div id="page">
      <Header className="header" />
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
          />
        </div>
      </div>
      <Footer className="footer"/>
    </div>
  )
} 