import React, { useEffect, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import IniciarBatalha from "./../Componentes/IniciarBatalha";
import ListarPokemomsBatalha from "./../Componentes/ListarPokemomsBatalha";
import PokemomsAdversariosRandom from "./../Componentes/PokemomsAdversariosRandom";
import { rPlayer, PlayerStruct, PokemomsAdversarios } from "./../Componentes/Structs";
import "./../css/table-combat.css";
import ResultadoBatalha from '../Componentes/ResultadoBatalha';

const ComecarCombate = (props) => {

  const [comecoLuta, setComecoLuta] = useState(false)

  const [player, setPlayer] = useReducer(rPlayer, PlayerStruct);
  const MovesPlayer = [];

  const [pokemomsAdversarios, setPokemomsAdversarios] = useReducer(rPlayer, PokemomsAdversarios);
  const MovesOponent = [];

  const [a,sA] = useState('')
  const [b,sB] = useState('')
  function BuscarDadosApi() {
    getMovimentos();
    sA(<ListarPokemomsBatalha      player={MovesPlayer}      oponente={MovesOponent}    />)
    sB(<IniciarBatalha      resultado={(r) => setresBatlle(resBatlle.concat(r))}      MovesPlayer={MovesPlayer}      MovesOponent={MovesOponent}      MudarParaBatalha={(r) => setComecoLuta(r)} />)
  }
  function getMovimentos() {
    player.pokemoms.forEach((a, b) => {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id)
        .then(res => { MovesPlayer.push({ 'numero': b, 'moves': res.data }) })
    })

    pokemomsAdversarios.forEach((a, b) => {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id_pokedex)
        .then(res => { MovesOponent.push({ 'numero': b, 'moves': res.data }) })
    })
    console.log(MovesPlayer, MovesPlayer)
  }

  useEffect(() => {
    setPlayer(props.location.data)

  }, [props.location.data]);

  const [resBatlle, setresBatlle] = useState([])
  return (
    <div>
      {
        props.location.data === undefined ?
          <Redirect to='/Combate/escolha' />
          :
          <div>
            <h2>Sou um cara chamado, {player.treinador[1]}</h2>
            <p>
              <PokemomsAdversariosRandom teste={(r) => setPokemomsAdversarios(r)} />
            </p>
            <p>
              <button className="btn btn-success" onClick={() => BuscarDadosApi()}>Consultar Api</button>
            </p>
            {
              comecoLuta ?
                <ResultadoBatalha resultado={resBatlle} />
              :
                <>
                  {a}

                  {b}
                </>
            }
          </div>
      }
    </div>
  )
}

export default ComecarCombate