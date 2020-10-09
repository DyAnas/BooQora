import React from "react";
import auth from "../Authentication/auth";

export const Home = (props) => {
    return (<div>
        <h1> Home </h1>

        <button onClick={() => {
            auth.logout(() => {
                props.history.push("/");
            });
        }}
        >
            logout
        </button>
    </div>
    );
}

