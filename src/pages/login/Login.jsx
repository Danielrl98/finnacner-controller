import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { userCollections } from "../../components/firebase/users";
import { getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigator = useNavigate();

  const dispath = useDispatch();

  const goDashboard = useCallback(() => {
    navigator("/dashboard");
  }, []);

  const getUsers = async () => {
   const data =  await getDocs(userCollections);
   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
  };
  useEffect(() => {
   getUsers() 
  }, [users]);

  const handleClickLogin = () => {

   let gerartoken = String((new Date().getTime() / 1000) * Math.random()) + email
     
   let sendToken = {
    type: "token",
    acessToken: gerartoken,
  }
  
   const verifyUser = users.some(obj => obj.email === email && obj.pass === pass )
    
    if(email !== ''){


      if(pass !== ''){

        if(verifyUser){

          dispath(sendToken);
          goDashboard()
    
        } else{

          alert("Não existe esse cadastro")
        }

      } else{

        alert('preencha sua senha')
      }

    } else{
     alert('preencha seu email')
    }
    
 
  };

  return (
    <React.Fragment>
      <Titulo>Login</Titulo>
      <div>
        <label htmlFor="email"> Email </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pass"> Senha </label>
        <input
          type="text"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button onClick={handleClickLogin}>Enviar</button>
      <p>{message}</p>
    </React.Fragment>
  );
}

const Titulo = styled.h1`
  color: black;
  font-size: 32px;
`;
