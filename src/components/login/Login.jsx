import React from "react";
import styled from "styled-components";
import { useRef,useState } from "react";
import { useSelector } from "react-redux";

export default function Login() {


  const refs = {
    email: useRef(),
    pass: useRef()
  }

  const { users } = useSelector((rootReducer) => rootReducer.userReducer);
  let valornovo = Object.values({users})
  let assumirValorNovo = valornovo[0]
  let arrayUser = []
  arrayUser.push(assumirValorNovo)
  

  for (let index = 0; index < assumirValorNovo.length; index++) {
     
    if(assumirValorNovo[index] !== undefined){
      arrayUser.push(assumirValorNovo[index])
    }
  
  }

  const [messagem,setMensagem] = useState('')

  const handleClickLogin = () =>{

    let verificaEmailExiste = arrayUser.some(obj => obj.email === refs.email.current.value)
    
    if(verificaEmailExiste){
        location.href="Dashboard"
    } else{
      setMensagem('Email não existe no cadastro')
    }
  }
  
  return (
    <React.Fragment>
      <Titulo>Login</Titulo>

      <label htmlFor="email"> Email  </label>
        <input type="text" id="email" ref={refs.email} />
    
      <label htmlFor="pass"> Senha </label>
        <input type="text" id="pass" ref={refs.pass} />
     
      <button
        onClick={ handleClickLogin }
      >Enviar</button>
      <p>{messagem}</p>
    </React.Fragment>
  );
}

const Titulo = styled.h1`
  color: black;
  font-size: 32px;
`;
