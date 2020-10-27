import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import { ProtectedRoute } from "./Authentication/protectedRoute";
import { NextPage } from './Test to delete/nextpage'
import ForgotPassword from "./Copmonent/Login/ForgotPassword";
import Verification from "./Copmonent/Login/VerfictionCode";
import NewPassword from "./Copmonent/Login/NewPassword";
import { Home } from './Container/home'
import { About } from './Container/aboutBookora';
import { NewBooking } from "./Container/newBooking";
import { MyBooking } from "./Container/myBooking";
import { NavBar } from "./Container/Navbar";
class App extends Component {

  render() {

    return (

      <div className="">

        <BrowserRouter>

          <Switch>
            <Route path="/" exact component={SignInContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/Verification" component={Verification} />
            <Route path="/NewPassword" component={NewPassword} />
            <ProtectedRoute
              path="/home"
              component={Home} />
                          <ProtectedRoute
              path="/newBooking"
              component={NewBooking} />

              
            <ProtectedRoute
              path="/myBookings"
              component={MyBooking} />
            <ProtectedRoute
              path="/aboutBookora"
              component={About} />
            <Route path="*" component={() => "404 Not Found "} />
          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
