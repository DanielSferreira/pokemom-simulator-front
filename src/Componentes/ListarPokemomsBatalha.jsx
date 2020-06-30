import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ListarPokemomsBatalha = (props) => {

  const [Player,setPlayer] = useState([])
  useEffect(()=>{
  },[])
  return (
    <>
      <button onClick={()=>setPlayer(props.player)}>Eu</button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th colSpan="5" scope="col">Batalha Pokemon</th>
          </tr>
          <tr>
            <th>?</th>
            <th>Luta Pokemom</th>
            <th></th>
            <th>Outro noom</th>
            <th>?</th>
          </tr>
        </thead>

        <tbody>
          {
            Player.map((a, b) => {
              return (
                <tr key={b}>
                  <td><img src={a.moves.sprites.front_default} alt="Aviso"/></td>
                  <td>{a.moves.name}</td>
                  <td>VS</td>
                  <td>{props.oponente[b].moves.name}</td>
                  <td><img src={props.oponente[b].moves.sprites.front_default} alt="Aviso"/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
     </>
  )
}

export default ListarPokemomsBatalha