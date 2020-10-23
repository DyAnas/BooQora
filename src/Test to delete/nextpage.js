import React from "react";
import AuthService from "../Authentication/authUser";
import {MiniDrawer} from "../Container/home";

export const NextPage = (props) => {
    const currentUser = AuthService.getCurrentUser();


    return (<MiniDrawer className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken}

            </p>
            <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>

            <button onClick={() => {
                AuthService.logout();
                props.history.push("/")

            }}
            >
                logout </button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/home">Next protected page</a>
        </MiniDrawer>

    );
}

