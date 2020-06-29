import React, { useEffect, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import IniciarBatalha from "./../Componentes/IniciarBatalha";
import ListarPokemomsBatalha from "./../Componentes/ListarPokemomsBatalha";
import PokemomsAdversariosRandom from "./../Componentes/PokemomsAdversariosRandom";
import { rPlayer, PlayerStruct, PokemomsAdversarios } from "./../Componentes/Structs";
import "./../css/table-combat.css";

const ComecarCombate = (props) => {

  const [comecoLuta, setComecoLuta] = useState(false)

  const [player, setPlayer] = useReducer(rPlayer, PlayerStruct);
  const MovesPlayer = [];

  const [pokemomsAdversarios, setPokemomsAdversarios] = useReducer(rPlayer, PokemomsAdversarios);
  const MovesOponent = [];

  function getMovimentos() {
    player.pokemoms.forEach((a, b) => {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id)
        .then(res => { MovesPlayer.push({ 'numero': b, 'moves': res.data }) })
    })

    pokemomsAdversarios.forEach((a, b) => {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id_pokedex)
        .then(res => { MovesOponent.push({ 'numero': b, 'moves': res.data }) })
    })
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
              <button className="btn btn-success" onClick={() => getMovimentos()}>GetMovimentos</button>
            </p>
            <p>
            </p>
            {
              comecoLuta ?

                <>

                  {
                    resBatlle.map((e, key) => {
                      return (
                        <table className="table table-bordered" key={'b' + key}>
                          <thead>
                            <tr>
                              <th colSpan="7" scope="col"> {key + 1}ª Batalha</th>
                            </tr>
                            <tr>
                              <th colSpan="3" scope="col">{e.nPlayer}</th>
                              <th scope="col">X</th>
                              <th colSpan="3" scope="col"> {e.nOponente}</th>
                            </tr>
                            <tr>
                              <th scope="col">HP</th>
                              <th scope="col">atk/def</th>
                              <th scope="col">status</th>
                              <th scope="col"></th>
                              <th scope="col">status</th>
                              <th scope="col">atk/def</th>
                              <th scope="col">HP</th>
                            </tr>
                          </thead>

                          <tbody>
                            {e.rodadas.map((e, key) => {
                              return (
                                <tr key={'tr' + key}>
                                  <td>{e[0]}</td>
                                  <td>{e[1]}</td>
                                  <td>{key % 2 === 0 ? 'Ataca' : 'Defende'}</td>
                                  <td>VS</td>
                                  <td>{key % 2 === 0 ? 'Defende' : 'Ataca'}</td>
                                  <td>{e[2]}</td>
                                  <td>{e[3]}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      )
                    })
                  }

                </>
                :
                <>
                  <ListarPokemomsBatalha
                    player={player}
                    oponente={pokemomsAdversarios}
                  />

                  <IniciarBatalha
                    resultado={(r) => setresBatlle(resBatlle.concat(r))} 
                    //resultado={(r) => setresBatlle(r) }
                    MovesPlayer={MovesPlayer}
                    MovesOponent={MovesOponent}
                    MudarParaBatalha={(r) => setComecoLuta(r)}
                  />
                </>
            }
          </div>
      }
    </div>
  )
}

export default ComecarCombate