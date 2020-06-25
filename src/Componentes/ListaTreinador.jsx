import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const ListaTreinador = (props) => {

    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/treinadores/all')
          .then(function (response) {
              setResult(response.data)
            })
            .catch(function (error) {
              console.log(error);
            })

      }, []);

      const changePokemom = (event)=>{
        props.onChange(event.target.value)
      }
    
    return (
        <>
        Nome do Treinador: <br />
          <select onChange={changePokemom}>  
          <option>Selecione um treinador</option> 
              { 
                result.map((a,key) => <option value={a[0] + ';'+ a[1]} key={key}> { a[1] } </option> ) 
              }
          </select>
              <NavLink to="/treinador/novo">Cadastrar novo Treinador</NavLink>
        </>
    )
}

export default ListaTreinador