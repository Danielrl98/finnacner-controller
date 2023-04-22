import React from "react";

export default function Header(){

    return(
        <React.Fragment>
            <div>
                <a href="/">Login</a >
                <a href="/register">Register</a >
                <a href="/dashboard">Dashboard</a >
                <a href="/release">Lançamentos</a >
                <a href="/release/create">Criar lançamento</a >
                <a href="/clients">Clientes</a >
                <a href="/clients/create">Criar Cliente</a >
            </div>
        </React.Fragment>

    )
}