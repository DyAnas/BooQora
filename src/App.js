import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import  {MiniDrawer}  from './Container/home'
import { ProtectedRoute } from "./Authentication/protectedRoute";
import { NextPage } from './Test to delete/nextpage'
import ForgotPassword from "./Copmonent/Login/ForgotPassword";
import Verification from "./Copmonent/Login/VerfictionCode";
import NewPassword from "./Copmonent/Login/NewPassword";
class App extends Component {

  render() {

    return (

      <div className="">

<BrowserRouter>

<Switch>
  <Route path="/" exact component={SignInContainer} />
  <Route path="/signup" component={SignUpContainer} />
  <Route path="/forgotPassword"  component={ForgotPassword} />
  <Route path="/Verification"  component={Verification} />
  <Route path="/NewPassword"  component={NewPassword} />
  <ProtectedRoute
    path="/home"
    component={MiniDrawer} />

    <ProtectedRoute
        path="/next"
        component={NextPage} />
  <Route path="*" component={() => "404 Not Found "} />
</Switch>

</BrowserRouter>

      </div >
    );
  }
}
export default App;
