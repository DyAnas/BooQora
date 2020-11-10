import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import { ProtectedRoute } from "./Authentication/protectedRoute";
import NewPassword from "./Copmonent/Login/NewPassword";
import { Home } from './Container/home'
import { About } from './Container/aboutBookora';
import { NewBooking } from "./Container/newBooking";
import { MyBooking } from "./Container/myBooking";
import { ZoneSettings } from "./Copmonent/AdminPages/ZoneSettings";
import ContainerForgotPassword from "./Container/ContainerForgotpassword";
import resendConfirm from "./Copmonent/Login/resendActivation";
class App extends Component {

  render() {
    return (
      <div className=" vh-100">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignInContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/resend-activation" component={resendConfirm} />
            <Route path="/forgotPassword" component={ContainerForgotPassword} />
            <ProtectedRoute path="/NewPassword" component={NewPassword} />
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
               <ProtectedRoute
              path="/zonesettings"
              component={ZoneSettings} />
            <Route path="*" component={() => "404 Not Found "} />
            
          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
