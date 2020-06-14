import React from 'react';
import {  NavLink  } from "react-router-dom";
import routes from './routes'


const Menu = (props) => 
{
    const route = routes.map(({path,label},key) => <NavLink to={path} key={key}> <br /> Ir para: {label} </NavLink>)
    return (
        <nav>
            Menu de Teste.
            {route}
        </nav>

    )
}

export default Menu