import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaTreinador from "./../Componentes/ListaTreinador";
import {NavLink} from 'react-router-dom'

const EscolheParaCombate = (props) => {

  const [treinador, setTreinador] = useState(['Ash Kethun','0'])
  
  const [pokemoms, setPokemoms] = useState([])
  
  const [QuantPokemom, setQuantPokemomSelecionados] = useState(0)
  const [cont, setCont] = useState(6)
  
  const [pokemomsParaBatalha, setPokemomsParaBatalha] = useState([])
  
  function Treinador(v) {
    let data = v.split(';')
    setTreinador(data)
  }
  useEffect(() => {

    axios.get('http://localhost:5000/pokemomsByTreinador/'+treinador[1])
      .then(function (response) {
        if(response.data.length === 0) {
          setPokemoms(['Esse Treinador não possue pokemom']);
        } else {
          console.log(response.data);
          setPokemoms(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [treinador]);

  const QuantidadePokemomsSelecionado = (e)=> {
    if (e.target.checked) {
      setQuantPokemomSelecionados(QuantPokemom+1)
      setPokemomsParaBatalha([...pokemomsParaBatalha, {id:e.target.name, value:e.target.value}])
      setCont(cont-1)
    }
    else {
      setQuantPokemomSelecionados(QuantPokemom-1)
      setPokemomsParaBatalha(pokemomsParaBatalha.filter(item => item.id !== e.target.name));
      setCont(cont+1)
    }
  }

  return (
    <div>
        <h3>Tela de Combate <small>Escolha pokemoms para combater</small></h3>
        
      <ListaTreinador onChange={Treinador}></ListaTreinador>
      <div>
        Escolha no minimo 6 pokemoms para avançar para a batalha. <br />
        {
          pokemoms.map((a, key) => {
            if (a === "Erro") {
              return ''
            } 
            else if(a === 'Treinador não achadado HAHA'){
              return ""
            }
            else if(a === 'Esse Treinador não possue pokemom'){
              return <h3 key={key}> Esse Treinador não possue pokemom </h3>
            }
            else {
              return (
                <div className="form-check" key={key}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={a.pokemom_nome} 
                    name={a.id_pokedex} 
                    id={"op"+key} 
                    onClick={QuantidadePokemomsSelecionado } 
                  />
                  <label className="form-check-label" htmlFor={"op"+key}>
                  {a.pokemom_nome}
                  </label>
                </div>
              // <label key={key}> <input type="checkbox"  value={a.pokemom_nome} name={a.id_pokedex} onClick={QuantidadePokemomsSelecionado }/> {a.pokemom_nome} <br /></label>
              )
            }
          }) 
        }
        {
          QuantPokemom <= 5 ?
            `Falta ${cont} pokemoms para completar `
          :
            QuantPokemom === 6 ?
              <NavLink to={{
                pathname: "/combate/comecar",
                data: {
                  treinador:treinador,
                  pokemoms:pokemomsParaBatalha
                }
              }}><button className="btn btn-success mb-2">Avançar</button></NavLink>
            :
              'Você só pode escolher apenas 6 pokemons'
        }
      </div>
    </div>
  )
}

export default EscolheParaCombate
