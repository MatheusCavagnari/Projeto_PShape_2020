import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts'

import api from '../../../services/api'
import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'
import './styles.css'

export default function Relatorio() {
  const [aluno, setNome] = useState('');
  const { id } = useParams()

  const [data, setData] = useState([])
  const [dataImc, setDataImc] = useState([])
  // const []

  useEffect(() => {
    const dadaosAvalBanco = async () => {
      const avaliacoes = await api.get(`/avaliacao?aluno=${id}`)
      console.log(avaliacoes.data)
      let acumPeso = [['Data', 'peso']]
      let acumImc = [['Data', 'IMC']]
      avaliacoes.data.forEach(avaliacao => {
        const peso = avaliacao.peso
        const altura = avaliacao.altura

        const IMC = peso / (altura * altura)

        const linhaPeso = [avaliacao.data_avaliacao, avaliacao.peso]
        const linhaImc = [avaliacao.data_avaliacao, IMC]
        acumPeso.push(linhaPeso)
        acumImc.push(linhaImc)
      });



      const alunoSel = async () => {
        await api.get(`/alunos/${id}`, { headers: { personal: localStorage.getItem('personal') } })
          .then(responseAluno => {
            if (responseAluno.data[0]?.sexo == "F") {
              var nome = 'da ' + responseAluno.data[0]?.nome;
            } else {
              nome = 'do ' + responseAluno.data[0]?.nome;
            }

            setNome(nome);

          })
          .catch(err => {
            console.log(err)
          })
      }
      alunoSel();


      //console.log(acumPeso)
      setData(acumPeso)
      setDataImc(acumImc)
    }

    dadaosAvalBanco()
  }, [id])

  function imprimir() {
    console.log("imprimir")
  }


  return (
    <div id="page">
      <Header />
      <Menu page="1" />
      <div className="main">
        <Titulo
          titulo={'Relatório ' + aluno}
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
              data={dataImc}
              options={{ title: "IMC" }}
            />
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="LineChart"
              data={data}
              options={{ title: "Peso" }}
            />
          </div>
          {/* <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              data={data}
              options={options}
            /> */}

        </div>
      </div>
      <Footer />
    </div>
  )
}