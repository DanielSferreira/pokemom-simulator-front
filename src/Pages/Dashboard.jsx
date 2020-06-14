import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaTreinador from "./../Componentes/ListaTreinador";

const DashBoard = (props) => {

  const [result, setResult] = useState([])
  const [treinador, setTreinador] = useState(['Ash Kethun','0'])
  function Treinador(v) {
    let data = v.split(';')
    setTreinador(data)
  }
  useEffect(() => {

    axios.get('http://localhost:5000/pokemomsByTreinador/'+treinador[1])
      .then(function (response) {
        setResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [treinador]);
  return (
    <div>
      {treinador[1]}
      <ListaTreinador onChange={Treinador}></ListaTreinador>
      <div>
        {result.map((a, key) => <h5 key={key}>{a}</h5>)}
      </div>
    </div>
  )
}

export default DashBoard
