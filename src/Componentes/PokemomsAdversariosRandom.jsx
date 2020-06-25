import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemomsAdversariosRandom = (props) => {
    
    const [Esconder, setEsconder] = useState(true)
    const [Poke1, sPoke1] = useState([{id_pokedex: '', pokemom_nome: ''}])
    const [Poke2, sPoke2] = useState([{id_pokedex: '', pokemom_nome: ''}])
    const [Poke3, sPoke3] = useState([{id_pokedex: '', pokemom_nome: ''}])
    const [Poke4, sPoke4] = useState([{id_pokedex: '', pokemom_nome: ''}])
    const [Poke5, sPoke5] = useState([{id_pokedex: '', pokemom_nome: ''}])
    const [Poke6, sPoke6] = useState([{id_pokedex: '', pokemom_nome: ''}])

    function getPokemoms(p) {
        return axios.get('http://localhost:5000/pokemom/getBy/id_pokedex/' + p)
    }
    function rand() {
        return Math.floor(Math.random() * 807)
    }
    useEffect(() => {
        getPokemoms(rand()).then(r => sPoke1(r.data))
        getPokemoms(rand()).then(r => sPoke2(r.data))
        getPokemoms(rand()).then(r => sPoke3(r.data))
        getPokemoms(rand()).then(r => sPoke4(r.data))
        getPokemoms(rand()).then(r => sPoke5(r.data))
        getPokemoms(rand()).then(r => sPoke6(r.data))

    }, []);
    function pacoca() {
        setEsconder(!Esconder)
        console.log("Vamos lá")
        props.teste([Poke1, Poke2, Poke3, Poke4, Poke5, Poke6])
    }
    return <button onClick={pacoca}>Procurar Oponentes</button>
}

export default PokemomsAdversariosRandom
