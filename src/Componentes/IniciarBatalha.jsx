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

    let damage = calcularDano(
      1 // level do atacante
      , atk.moves.moves[move_postion(atk.moves.moves.length)].move.name //nome do ataque
      , atk.moves.stats[1].base_stat //poder de ataque do atacante
      , def.moves.stats[2].base_stat //poder de defesa do defensor
    )

    return damage

  }

  async function simular_batalha(player, oponent) {
    // console.log(player, oponent)
    let cont = 0
    let vezJogador = true;
    let lifes = { pl: player.moves.stats[0].base_stat, op: oponent.moves.stats[0].base_stat }

    let arr = []

    while (true) {
      cont++;

      if (vezJogador) {
        let dano = await ronds(player, oponent).then(res => res);
        lifes.op = lifes.op - dano
        arr.push([lifes.op + dano, dano, oponent.moves.stats[0].base_stat, lifes.pl])
      } else {
        let dano = await ronds(oponent, player).then(res => res);
        lifes.pl = lifes.pl - dano
        arr.push([lifes.pl + dano, oponent.moves.stats[0].base_stat, dano, lifes.op])
      }

      vezJogador = !vezJogador
      if (lifes.pl <= 0 || lifes.op <= 0) {
        props.resultado({ nPlayer: player.moves.name, nOponente: oponent.moves.name, rodadas: arr, mensagem: "" })
      }
      if (lifes.pl <= 0) {
        return false
      }
      if (lifes.op <= 0) {
        return true
      }

    }
  }
  async function ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, next) {
    props.MudarParaBatalha(true)
    console.log(next);
    
    let resultadoBatalha = await simular_batalha(player[next.atual_poke_pl], oponent[next.atual_poke_op]).then(res => res)

    if (next.atual_poke_op === 5) {
      console.log("Jogador venceu");
      return "Jogador venceu"
    }
    if (next.atual_poke_pl === 5) {
      console.log("Jogador perdeu");
      return "Jogador perdeu"
    }
    if (resultadoBatalha === false) {
      ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, { atual_poke_pl: next.atual_poke_pl + 1, atual_poke_op: next.atual_poke_op })
    }
    if (resultadoBatalha === true) {
      ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, { atual_poke_pl: next.atual_poke_pl, atual_poke_op: next.atual_poke_op + 1 })
    }
  }
  return (
    <button 
      onClick={() => { IncializarBatalha() }}
      className="button button-success"
    >
      Simular Super Batalhas epicas
    </button>
  )
}

export default IniciarBatalha