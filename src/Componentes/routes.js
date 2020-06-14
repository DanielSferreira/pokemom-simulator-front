import Home from './../Pages/Home' ;
import Dashboard from './../Pages/Dashboard' ;
import CadastrarPokemomParaTreinador from './../Pages/CadastrarPokemomParaTreinador' ;
import CadastrarNovoTreinador from './../Pages/CadastrarNovoTreinador' ;

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
]

export default routes