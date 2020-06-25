import React, { useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import IniciarBatalha from "./../Componentes/IniciarBatalha";
import PokemomsAdversariosRandom from "./../Componentes/PokemomsAdversariosRandom";
import { rPlayer, PlayerStruct, PokemomsAdversarios, MovesStruct } from "./../Componentes/Structs";

const ComecarCombate = (props) => {

  const [player, setPlayer] = useReducer(rPlayer, PlayerStruct);
  const MovimentosPokemomPlayer = MovesStruct;

  const [pokemomsAdversarios, setPokemomsAdversarios] = useReducer(rPlayer, PokemomsAdversarios);
  const MovimentosPokemomOponente = MovesStruct;

  function pegarPokemonsOponentesGerados(r) {
    setPokemomsAdversarios(r)
  }

  function getMovimentos() {

    player.pokemoms.forEach((a, b) => {
      console.log(a)
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id)
        .then(res => MovimentosPokemomPlayer[b] = { 'numero': b, 'moves': res.data })
    })

    pokemomsAdversarios.forEach((a, b) => {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + a.id_pokedex)
        .then(res => MovimentosPokemomOponente[b] = { 'numero': b, 'moves': res.data })
    })

  }

  function mostrarMovimentos() {
    console.log(MovimentosPokemomPlayer)
    console.log(MovimentosPokemomOponente)

  }
  useEffect(() => {
    setPlayer(props.location.data)

  }, [props.location.data]);

  return (
    <div>
      {
        props.location.data === undefined ?
          <Redirect to='/Combate/escolha' />
          :
          <div>
            <h2>Sou um cara chamado, {player.treinador[1]}</h2>
            <PokemomsAdversariosRandom teste={(r) => pegarPokemonsOponentesGerados(r)} />
            <h2 onClick={() => getMovimentos()}>GetMovimentos</h2>
            <h3 onClick={() => mostrarMovimentos()}>mostrarMovimentos</h3>
            <table>
              <thead>
                <tr>
                  <th>Pokemoms de: {player.treinador[1]}</th>
                  <th>Pokemoms do Oponente</th>
                </tr>
              </thead>

              <tbody>
                {
                  player.pokemoms.map((a, b) => {
                    return (
                      <tr key={b}>
                        <td>{a.value}</td>
                        <td>{pokemomsAdversarios[b].pokemom_nome}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <IniciarBatalha
              player={MovimentosPokemomPlayer}
              oponente={MovimentosPokemomOponente} >
            </IniciarBatalha>
          </div>
      }
    </div>
  )
}

export default ComecarCombate
