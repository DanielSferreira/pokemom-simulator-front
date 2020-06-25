import Home from './../Pages/Home' ;
import Dashboard from './../Pages/Dashboard' ;
import EscolheParaCombate from './../Pages/EscolheParaCombate' ;
import CadastrarPokemomParaTreinador from './../Pages/CadastrarPokemomParaTreinador' ;
import CadastrarNovoTreinador from './../Pages/CadastrarNovoTreinador' ;
import ComecarCombate from './../Pages/ComecarCombate' ;
import TesteUseReducer from '../Pages/testeUseReducer';

const routes = [
    {
        path: '/',
        component: Home,
        label: 'Inicio'
    },
    {
        path: '/index',
        component: Dashboard,
        label: 'DashBoard'
    },
    {
        path: '/addPokemomToTrainer',
        component: CadastrarPokemomParaTreinador,
        label: 'Cadastrar novo Pokemom para treinador'
    },
    {
        path: '/treinador/novo',
        component: CadastrarNovoTreinador,
        label: 'Cadastrar Um novo treinador'
    },
    {
        path: '/Combate/escolha',
        component: EscolheParaCombate,
        label: 'Inicar Combate'
    },
    {
        path: '/Combate/comecar',
        component: ComecarCombate,
        label: 'Ir para Combate'
    },
    {
        path: '/teste',
        component: TesteUseReducer,
        label: 'Ir para Teste'
    },
]

export default routes