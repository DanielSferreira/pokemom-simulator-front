import React from 'react';

const ResultadoBatalha = (props) => 
{
    return (
        props.resultado.map((e, key) => {
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
                        <td>{e.hpAtt}</td>
                        <td>{e.actAtt}</td>
                        <td>{key % 2 === 0 ? 'Ataca' : 'Defende'}</td>
                        <td>VS</td>
                        <td>{key % 2 === 0 ? 'Defende' : 'Ataca'}</td>
                        <td>{e.actDef}</td>
                        <td>{e.hpDef}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )
          })

    )
}

export default ResultadoBatalha