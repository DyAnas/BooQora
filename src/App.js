import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpContainer from "./Module/Login/SignUpContainer";
import SignInContainer from './Module/Login/SignInContainer'
import { ProtectedRoute } from "./service/Authentication/protectedRoute";
import NewPassword from "./Component/Login/NewPassword";
import { About } from './Module/About/aboutBookora';
import { NewBooking } from "./Module/Booking/newBooking";
import { MyBooking } from "./Module/Booking/myBooking";
import ZoneSettings from "./Component/AdminPages/ZoneSettings";
import ContainerForgotPassword from "./Module/Login/Forgotpassword";
import resendConfirm from "./Component/Login/resendActivation";
import ChartContainer from "./Module/Statistics/ChartContainer";
import Archive from "./Module/Statistics/Statistics";
import { NotFoundPage } from "./Module/NotFoundPage";
import { CreateNewAdmin } from "./Component/AdminPages/CreateNewAdmin";
import { NavigationBar } from "./Component/Layout/NavigationBar";


class App extends Component {

  render() {
    return (
      <div className=" contianer">

        <BrowserRouter>
          <Switch>
         
            <Route path="/" exact component={SignInContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/resend-activation" component={resendConfirm} />
            <Route path="/forgotPassword" component={ContainerForgotPassword} />
            <ProtectedRoute path="/NewPassword" component={NewPassword} />
            <>
              <div className="container">
                <ProtectedRoute component={NavigationBar} />

                <ProtectedRoute path="/newBooking" component={NewBooking} />

                <ProtectedRoute exact path="/myBookings" component={MyBooking} />

                <ProtectedRoute path="/addNewAdmin" component={CreateNewAdmin} />

                <ProtectedRoute path="/aboutBookora" component={About} />

                <ProtectedRoute path="/zonesettings" component={ZoneSettings} />

                <ProtectedRoute path="/statistics" component={ChartContainer} />

                <ProtectedRoute path="/archive" component={Archive} />
              </div>
            </>
            <Route exact path="*"  component={NotFoundPage} />

          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
