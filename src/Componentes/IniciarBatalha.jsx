import React from 'react';
import axios from 'axios';

const IniciarBatalha = (props) => {
  
  function IncializarBatalha() {
    ChamarNovaBatalhaEnquantoHoverPokemom(props.MovesPlayer, props.MovesOponent, { atual_poke_pl: 0, atual_poke_op: 0 });
  }

  async function buscarDamageMove(id_dano) {
    return await axios.get('https://pokeapi.co/api/v2/move/' + id_dano)
  }

  async function calcularDano(level, move_number, atackEffective, defeseOponent) {

    let power = await buscarDamageMove(move_number).then(res => res.data.power)

    let part1 = ((2 * Number(level)) / 5) + 2
    let part2 = Number(power) * (Number(atackEffective) / Number(defeseOponent))
    let part3 = ((part1 * part2) / 50) + 2
    let part4 = Math.floor(Math.random() * (4 - 2) + 2)
    let part5 = Math.round(part3 * part4)

    return part5;

  }

  function move_postion(len) {
    return Math.floor(Math.random() * (len - 0) - 0)
  }

  function ronds(atk, def) {
    
    return calcularDano(
      1 // level do atacante
      , atk.moves.moves[move_postion(atk.moves.moves.length)].move.name //nome do ataque
      , atk.moves.stats[1].base_stat //poder de ataque do atacante
      , def.moves.stats[2].base_stat //poder de defesa do defensor
    )

  }

  const resultadoRodada = []

  async function roundFaciliter(atacante, defensor, timeOfPlayer) {
      let dano = await ronds(atacante, defensor).then(res => res);
      defensor.moves.stats[0].base_stat = defensor.moves.stats[0].base_stat - dano
      
      if(timeOfPlayer) {
        return {
          hpAtt:  atacante.moves.stats[0].base_stat, 
          actAtt: dano,
          actDef: defensor.moves.stats[2].base_stat,
          hpDef:  defensor.moves.stats[0].base_stat
        }
      }
      else {
        return {
          hpAtt:  defensor.moves.stats[0].base_stat, 
          actAtt: defensor.moves.stats[2].base_stat,
          actDef: dano,
          hpDef:  atacante.moves.stats[0].base_stat
        }
      }
  }

  async function simular_batalha(player, oponent) {
    
    let vezJogador = true;
    let arr = []

    while (true) {
      if (vezJogador)
        arr.push(await roundFaciliter(player, oponent, true ))
      else
        arr.push(await roundFaciliter(oponent, player, false))
     
      vezJogador = !vezJogador

      if (player.moves.stats[0].base_stat <= 0 || oponent.moves.stats[0].base_stat <= 0) {
        resultadoRodada.push({ nPlayer: player.moves.name, nOponente: oponent.moves.name, rodadas: arr, mensagem: "" })
        props.resultado(resultadoRodada)
      }
      if (player.moves.stats[0].base_stat <= 0) { console.log(`${player.moves.name} está fora de combate, ${oponent.moves.name} é o vencedor`); return false}
      
      if (oponent.moves.stats[0].base_stat <= 0) { console.log(`${oponent.moves.name} está fora de combate, ${player.moves.name} é o vencedor`); return true}

    }
  }
  
  async function ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, next) {
    console.log(player, oponent);
    
    props.MudarParaBatalha(true)

    let resultadoBatalha = await simular_batalha(player[next.atual_poke_pl], oponent[next.atual_poke_op]).then(res => res)

    if (resultadoBatalha === false) {
      if (next.atual_poke_pl + 1 > 5) {
        console.log("Jogador Perdeu")
        return null
      }
      ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, { atual_poke_pl: next.atual_poke_pl + 1, atual_poke_op: next.atual_poke_op })
    }
    if (resultadoBatalha === true) {
      if (next.atual_poke_op + 1 > 5) {
        console.log("Jogador Venceu")
        return null
      }
      ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, { atual_poke_pl: next.atual_poke_pl, atual_poke_op: next.atual_poke_op + 1 })
    }
  }
  return (
    <button onClick={() => { IncializarBatalha() }} className="btn btn-success" >
      Simular Super Batalhas epicas
    </button>
  )
}

export default IniciarBatalha