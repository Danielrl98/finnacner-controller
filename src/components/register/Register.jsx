import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHref, useNavigate } from "react-router-dom";

export default function Register() {
  const refs = {
    user: useRef(),
    email: useRef(),
    pass: useRef(),
  };

  const navigator = useNavigate()

  const GoLogin = useCallback( ()=>{

    navigator("/")

  },[])
 

  const dispatch = useDispatch();

  const { users } = useSelector((rootReducer) => rootReducer.userReducer);
  let valornovo = Object.values({users})
  let assumirValorNovo = valornovo[0]
  let arrayUser = []

  const [messagem,setMensagem] = useState('')

  for (let index = 0; index < assumirValorNovo.length; index++) {
     
    if(assumirValorNovo[index] !== undefined){
      arrayUser.push(assumirValorNovo[index])
    }
  
  }
  const handleClickSubmit = () => {

      let capturarCampos = {
      type: "vazio por enquanto",
      payload: {
        user: refs.user.current.value,
        email: refs.email.current.value,
        pass: refs.pass.current.value,
      },
    };
    let verificaEmalExiste = arrayUser.some( obj => obj.email === refs.email.current.value)
    
    if(verificaEmalExiste){
      setMensagem('email já existe')
    } else{
      dispatch(capturarCampos)
      GoLogin()
    }
  };
 
  return (
    <React.Fragment>
      <h1>Registro</h1>
     
      <label htmlFor="user"> usuário </label>
      <input type="text" id="user" ref={refs.user} />
      <label htmlFor="email"> Email</label>
      <input type="text" id="email" ref={refs.email} />
      <label htmlFor="senha"> Senha</label>
      <input type="text" id="senha" ref={refs.pass} />
      <button onClick={handleClickSubmit}>Enviar</button>
      <p>{ messagem } </p>
     
      </React.Fragment>
  );
}
