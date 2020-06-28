import React from 'react';
import {  Switch, Route  } from "react-router-dom";
import routes from './Componentes/routes'

function App() {

  const route = routes.map(({path,component},key) => <Route exact path={path} component={component} key={key}  /> )
  
  return (
    <div className='row'>
      
      <div className='col'></div>
      <div className='col-8'>
        <Switch>
          {route}
        </Switch>
      </div>
      <div className='col'></div>
    </div>
  );
}

export default App;
