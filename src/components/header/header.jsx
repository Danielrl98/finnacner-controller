import React from "react";

export default function Header(){

    return(
        <React.Fragment>
            <div>
                <a href="/">Login</a >
                <a href="/register">Register</a >
                <a href="/dashboard">Dashboard</a >
            </div>
        </React.Fragment>

    )
}