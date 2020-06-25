import React from 'react';
import axios from 'axios';

const IniciarBatalha = (props) => {
    
    async function buscarDamageMove(id_dano) {
        return await axios.get('https://pokeapi.co/api/v2/move/' + id_dano)
      }
    
      async function calcularDano(level, move_number, atackEffective, defeseOponent) {
    
        let power = await buscarDamageMove(move_number).then(res => res.data.power)
    
        let part1 = ((2 * Number(level)) / 5) + 2
        let part2 = Number(power) * (Number(atackEffective) / Number(defeseOponent))
        let part3 = ((part1 * part2) / 50) + 2
        let part4 = Math.floor(Math.random() * (4 - 2) + 2)
        let part5 = part3 * part4
    
        return part5;
    
      }
    
      function move_postion(len){
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
        let cont = 0
        let vezJogador = true;
        let Pname = player.moves.name
        let Oname = oponent.moves.name
        let resultado = "por enquanto nada"
        let lifes = {
            pl: player.moves.stats[0].base_stat,
            op: oponent.moves.stats[0].base_stat
        }
    
        while (true) {
          cont++;
          if (vezJogador) {
            //player atacando o oponente
            let dano = await ronds(player, oponent).then(res => res);
            lifes.op = lifes.op - dano
            console.log(` ${Oname} está com ${lifes.op+dano} de HP e recebe o valor de ${dano} dano de ${Pname} ficando com ${lifes.op} de HP`);
          } else {
            //oponente atacando o player
            let dano = await ronds(oponent, player).then(res => res);
            lifes.pl = lifes.pl - dano
            console.log(` ${Pname} está com ${lifes.pl+dano} de HP e recebe o valor de ${dano} dano de ${Oname} ficando com ${lifes.pl} de HP`);
          }
          vezJogador = !vezJogador
    
          if (lifes.pl <= 0) {
            resultado = ''
            console.log(`O vencedor da rodada ${cont} é: Player perdeu a vida`);
            return false
          }
          if (lifes.op <= 0) {
            resultado = 'player'
            console.log(`O vencedor da rodada ${cont} é: ${resultado}`);
            return true
          }
        }
      }
      async function ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, next) {
         
        let playerVenceu = await simular_batalha(player[next.atual_poke_pl], oponent[next.atual_poke_op]).then(res=> res)
        
        if (next.atual_poke_op === 5) {
          console.log("Jogador venceu");
          return "Jogador venceu"
        }
        if (next.atual_poke_pl === 5) {
          console.log("Jogador perdeu");
          return "Jogador perdeu"
        }
        if (playerVenceu === false) {
          let a = next.atual_poke_pl+ 1
          ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, {atual_poke_pl: a,atual_poke_op: next.atual_poke_op})
        }
         if (playerVenceu === true) {
          let b = next.atual_poke_op+ 1
          ChamarNovaBatalhaEnquantoHoverPokemom(player, oponent, {atual_poke_pl: next.atual_poke_pl,atual_poke_op: b})
        }
    
      }

    return <button onClick={() => ChamarNovaBatalhaEnquantoHoverPokemom(props.player, props.oponente, { atual_poke_pl: 0, atual_poke_op: 0 })}>Simular Super Batalhas epicas</button>
}

export default IniciarBatalha