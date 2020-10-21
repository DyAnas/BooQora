import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import  {MiniDrawer}  from './Container/home'
import { ProtectedRoute } from "./Authentication/protectedRoute";
import { NextPage } from './Test to delete/nextpage'

class App extends Component {

  render() {

    return (

      <div className="">

<BrowserRouter>

<Switch>
  <Route path="/" exact component={SignInContainer} />
  <Route path="/signup" component={SignUpContainer} />


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
