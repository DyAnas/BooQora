import React, { Component } from 'react';
import './App.css';
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import SignUp from "./Componenet/SignUP/signup";
import SignIn from './Componenet/SignIN/SignIn'
class App extends Component{


  render() {
  return (
    <div className="App">
        <Switch>
        <Route path="/" exact component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        </Switch>
    </div>
  );
}
}
export default App;
