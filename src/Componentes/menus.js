import React from 'react';
import { NavLink } from "react-router-dom";
import routes from './routes'

const selection = [
    '/',
    '/index',
    '/addPokemomToTrainer',
    '/Combate/escolha',
];

const stl = {
    nav: {
        background: 'red',
        paddingTop: '1em',
        paddingBottom: '1em',
        marginBottom: '5em'
    },
    label: {
        color: 'white'
    }
}

const Menu = () => {

    const route = routes.filter(({ path }) => {
        return (
            selection.includes(path)
        )
    })
        .map(({ path, label }, key) => {
            return (
                <li className="nav-item" key={key}>
                    <NavLink
                        style={stl.label}
                        className="nav-link"
                        to={path}>
                        {label}
                    </NavLink>
                </li>
            )

        })
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={stl.nav}>
            <NavLink to='/' className="navbar-brand" style={stl.label}>Pokedex - Simulator Combat</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav">
                    {route}
                </ul>
            </div>
        </nav>

    )
}

export default Menu