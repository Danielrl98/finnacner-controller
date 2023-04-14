import React from "react";
import { Link } from "react-router-dom";
export default function Header(){

    return(
        <React.Fragment>
            <div>
                <a href="/">Login</a>
                <a href="/register">Register</a>
            </div>
        </React.Fragment>

    )
}