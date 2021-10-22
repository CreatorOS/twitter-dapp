import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/User';
import {BrowserRouter, Switch, Route} from "react-router-dom";
const Default = () => {
  return(
    <Switch>
      <Route component={App} path="/" exact />
      <Route component={Search} path={`/:params`}  />
      <Route component={App} />
    </Switch>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Default />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
