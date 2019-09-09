import React from "react";
import { Redirect } from 'react-router';
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cadastro from "./containers/Cadastro";
import Lista from "./containers/Lista";

function logged() {
  //Verifica a se há token no browser, caso não haja retorna false
  if (!localStorage.getItem('token')) {
    return false;
  } else {
    return true;
  }
}

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" render={() => {if (!logged()) { return <Login />; } else {return <Redirect to='/lista' />;}}} />
    <Route path="/login" render={() => {if (!logged()) { return <Login />; } else {return <Redirect to='/lista' />;}}} />
    <Route path="/signup" render={() => {if (!logged()) { return <Signup />; } else {return <Redirect to='/lista' />;}}} />
    <Route path="/cadastro" render={() => {if (logged()) { return <Cadastro />; } else {return <Redirect to='/login' />;}}} />
    <Route path="/lista" render={() => {if (logged()) { return <Lista />; } else {return <Redirect to='/login' />;}}} />
  </Hoc>
);

export default BaseRouter;
