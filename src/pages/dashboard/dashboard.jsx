import React from "react";
import styled from 'styled-components'

export default function Dashboard() {

  const Container = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    gap:30px;
    text-align: center;
    
  `
  return (
    <React.Fragment>
      <Container>
        <h1>Seja bem vindo ao meu projeto</h1>

        <p>
          Esse projeto se trata de um pequeno sistema financeiro onde é possível
          cadastrar todas as suas contas a pagar e a receber.
          <br></br> agradeço pela contribuição em
          melhoria desse projeto.
        </p>
      </Container>
    </React.Fragment>
  );
}
