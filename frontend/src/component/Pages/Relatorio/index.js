import React, { useState } from 'react'
import  { Chart } from 'react-google-charts'

import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'
import './styles.css'

export default function Relatorio() {
  const aluno = 'Relatorio Pedro'

  function imprimir() {
    console.log("imprimir")
  }

  const [options, setOptions] = useState({
    title: 'Gráfico de Pizza'
  })
  const [data, setData] = useState([
    ['Linguagens', 'Quantidade'],
    ['React', 100],
    ['Angular', 80],
    ['Vue', 50],
  ])

  return (
    <div id="page">
      <Header/>
      <Menu page="1"/>
      <div className="main">
        <Titulo
          titulo={aluno}
          textoBotao="Imprimir"
          classBotao="btntitulo"
          btnClick={imprimir}
        />
        <div className="content">
          <div className="graficos">

          <Chart
              width={'500px'}
              height={'300px'}
              chartType="BarChart"
              data={data}
              options={options}
            />
          <Chart
              width={'500px'}
              height={'300px'}
              chartType="LineChart"
              data={data}
              options={options}
            />
          </div>
          <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              data={data}
              options={options}
            />
          
        </div>
      </div>
      <Footer/>
    </div>
  )
}