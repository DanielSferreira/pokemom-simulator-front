import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ListaPokemom = (props) => {

    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/pokemom/listPokemom')
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
      <div className="form-group">
      <label> Nome do Pokemon: </label>
        <select className="form-control" onChange={changePokemom}>  
        <option>Selecione um pokemom</option> 
            { 
            result.map((a,key) => <option value={a.id_pokedex+";"+a.pokemom_nome} key={key}> { a.pokemom_nome } </option> ) 
            }
        </select>
        </div>
    )
}

export default ListaPokemom