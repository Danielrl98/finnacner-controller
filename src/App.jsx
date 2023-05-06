import React from "react";
import Rotas from "./routes/routes";
import Header from "./components/header/header";
import Navbar from "./components/navBar/navbar";
import styled from "styled-components";

export default function App() {
  const token = localStorage.getItem("token");

  const Grid = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    flex-direction: column-reverse;

    @media (max-width: 767px) {
      display: flex;
    }
  `;

  const GridDash = styled.div`
    background-color: ${(props) => props.theme.colors.background};
  `;
  return (
    <React.Fragment>
      {localStorage.getItem("token") ? (
        <Grid >
          <Navbar></Navbar>
          <GridDash style={token ? { height: "auto" } : { height: "100vh" }}>
            <Header />
            <Rotas />
          </GridDash>
        </Grid>
      ) : (
        <Grid style={{display: 'flex'}}>
          <GridDash style={token ? { height: "auto" } : { height: "100vh" }}>
            <Rotas />
          </GridDash>
        </Grid>
      )}
    </React.Fragment>
  );
}
