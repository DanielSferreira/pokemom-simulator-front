import React, { useEffect, useReducer,useState} from 'react';
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

  const [comecoLuta,setComecoLuta] = useState(false)

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

  function mudarEstadoParaBatalha(e) {
    setComecoLuta(e)
  }
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

            {
              comecoLuta ?
                
                <>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colSpan="5" scope="col">Batalha</th>
                      </tr>
                      <tr>
                        <th scope="col">ico</th>
                        <th scope="col">Jogador</th>
                        <th scope="col"></th>
                        <th scope="col">Oponente</th>
                        <th scope="col">ico</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">?</th>
                        <td>Mark</td>
                        <td>VS</td>
                        <td>Otto</td>
                        <td>?</td>
                      </tr>
                      <tr>
                        <th scope="row">?</th>
                        <td>Jacob</td>
                        <td>VS</td>
                        <td>Thornton</td>
                        <td>?</td>
                      </tr>
                      <tr>
                        <th scope="row">?</th>
                        <td>Larry the Bird</td>
                        <td>VS</td>
                        <td>Larry the Bird</td>
                        <td>?</td>
                      </tr>
                    </tbody>
                  </table>
                </>
                :
                <>
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th colSpan="5" scope="col">Batalha Pokemon</th>
                      </tr>
                      <tr>
                              <th>?</th>
                        <th>Pokemoms de: {player.treinador[1]}</th>
                              <th></th>
                        <th>Pokemoms do Oponente</th>
                              <th>?</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        player.pokemoms.map((a, b) => {
                          return (
                            <tr key={b}>
                              <td>?</td>
                              <td>{a.value}</td>
                              <td>VS</td>
                              <td>{pokemomsAdversarios[b].pokemom_nome}</td>
                              <td>?</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <IniciarBatalha
                    player={MovimentosPokemomPlayer}
                    oponente={MovimentosPokemomOponente} 
                    MudarParaBatalha={(r)=>mudarEstadoParaBatalha(r)}>
                  </IniciarBatalha>
                </>
                
            }
          </div>
      }
    </div>
  )
}

export default ComecarCombate