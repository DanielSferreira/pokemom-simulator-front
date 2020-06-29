import React from 'react';

const ListarPokemomsBatalha = (props) => {

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th colSpan="5" scope="col">Batalha Pokemon</th>
          </tr>
          <tr>
            <th>?</th>
            <th>Pokemoms de: {props.player.treinador[1]}</th>
            <th></th>
            <th>Pokemoms do Oponente</th>
            <th>?</th>
          </tr>
        </thead>

        <tbody>
          {
            props.player.pokemoms.map((a, b) => {
              return (
                <tr key={b}>
                  <td>?</td>
                  <td>{a.value}</td>
                  <td>VS</td>
                  <td>{props.oponente[b].pokemom_nome}</td>
                  <td>?</td>
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