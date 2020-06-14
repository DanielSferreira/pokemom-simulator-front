import React from 'react';
import {  Switch, Route  } from "react-router-dom";
import routes from './Componentes/routes'

function App() {

  const route = routes.map(({path,component},key) => <Route exact path={path} component={component} key={key}  /> )
  
  return (
    <Switch>
      {route}
    </Switch>
  );
}

export default App;
