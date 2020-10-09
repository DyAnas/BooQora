import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import  {Home}  from './Container/home'
import { ProtectedRoute } from "./Authentication/protectedRoute";


class App extends Component {

  render() {

    return (

      <div className="">

        <BrowserRouter>
          
          <Switch>
            <Route path="/" exact component={SignInContainer}/>
            <Route path="/signup" component={SignUpContainer}/>
            <ProtectedRoute 
            path="/home"
            component={Home}/>
            <Route path="*" component={()=> "404 Not Found "}/>
          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
