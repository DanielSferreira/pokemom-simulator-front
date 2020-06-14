import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ListaTreinador = (props) => {

    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000//treinadores/all')
          .then(function (response) {
            console.log(response.data)
              setResult(response.data)
            })
            .catch(function (error) {
              console.log(error);
            })

      }, []);

      const changePokemom = (event)=>{
        props.onChange(event.target.value)
        console.log(event.target.value)
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
          <a href="/novoTreinador">Cadastrar novo Treinador</a>
        </>
    )
}

export default ListaTreinador
//a.id_pokedex+";"+a.pokemom_nome