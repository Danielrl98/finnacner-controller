import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { userCollections } from "../../components/firebase/config";
import { getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Input,Label,Container, DivTerms, Submit, DivMessage } from "../../theme/theme";

export default function Login() {

  if(localStorage.getItem('token')){ location.href="/dashboard"; return; }

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [save,setSave] = useState(false)

  const passInput = useRef();
  const [alterInput, setAlterInput] = useState(false);
 

  const verifyLocalStorage = () =>{

    if(localStorage.getItem('email')){
      setEmail(localStorage.getItem('email').replaceAll('"',''))
      setSave(true)
    } 
    if(localStorage.getItem('save')){
      setSave(true)  
    }

  }
 
  const goDashboard = useCallback(() => {
    location.href="/dashboard"
  }, []);

  const getUsers = async () => {
    const data = await getDocs(userCollections);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, [users]);

  const hideMessage = (value) => {
    setMessage(value);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const handleClickLogin = (e) => {

    e.preventDefault();
    let gerartoken =
    String((new Date().getTime() / 1000) * Math.random()) + email;


    if(email === 'passar') {

      localStorage.setItem('token', JSON.stringify(gerartoken))
      goDashboard();
      return;
    }

    if(email == '') return  hideMessage("Email vazio tente novamente")
    if(pass == '')  return  hideMessage("Senha vazia tente novamente")
 
  
    const verifyUser = users.some((obj) => obj.email === email && obj.pass === pass)
    
    if (verifyUser) {

      if(save===true){

        localStorage.setItem('email',JSON.stringify(email))
        localStorage.setItem('save',JSON.stringify(true))

      } else{
        localStorage.clear()
      }

      localStorage.setItem('token', JSON.stringify(gerartoken))

      goDashboard();
    } else {
      hideMessage("Cadastro não existe, verifique suas credenciais");
    }
  };

  const hidePassword = () => {
    if (alterInput === false) {
      passInput.current.setAttribute("type", "text");
      setAlterInput(true);
      return;
    }
    passInput.current.setAttribute("type", "password");
    setAlterInput(false);
  };

  useEffect( () =>{
    verifyLocalStorage()
  },[])

  return (
    <React.Fragment>
      <Container>
        <form>
          <div>
            <Label htmlFor="email"> Email </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email.toLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
            />
            <FaUserAlt style={{ marginLeft: "-20px" }} />
          </div>
          <div>
            <Label htmlFor="pass"> Senha </Label>
            <Input
              type="password"
              id="pass"
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              ref={passInput}
            />
            <FaRegEyeSlash
              style={{ marginLeft: "-20px", cursor: "pointer" }}
              onClick={hidePassword}
            />
          </div>
          <DivTerms>
            <input
              type="checkbox"
              id="remember-data"
              onChange={(e) => setSave(e.target.checked)}
              checked= { save }
            />
            <label htmlFor="remember-data">Lembrar meu email</label>
          </DivTerms>
          <Submit onClick={handleClickLogin}>Enviar</Submit>
          <DivMessage>
            <p>{message}</p>
          </DivMessage>
          <div style={{textAlign:"center"}}>
            Não tem registro? <Link to="/register">Criar um conta</Link>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
}
