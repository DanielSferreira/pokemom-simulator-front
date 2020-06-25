const rPlayer = (a, b) => {
    return a = b
};

const PlayerStruct = { 
    treinador: [0, '0'],
     pokemoms: [{ 
         id: '', 
         value: '' 
        }] 
    };

const PokemomsAdversarios = [
    { id_pokedex: '', pokemom_nome: '' },
    { id_pokedex: '', pokemom_nome: '' },
    { id_pokedex: '', pokemom_nome: '' },
    { id_pokedex: '', pokemom_nome: '' },
    { id_pokedex: '', pokemom_nome: '' },
    { id_pokedex: '', pokemom_nome: '' }
];

const MovesStruct = [
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
    { moves: { moves: [{ move: { name: '' } }] }, stats: [0, { base_stat: 0 }, { base_stat: 0 }] },
];

export {
    rPlayer
    , PlayerStruct
    , PokemomsAdversarios
    , MovesStruct
}