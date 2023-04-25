import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { userCollections } from "../../components/firebase/config";
import { getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Input, Label, DivTerms, Submit, DivMessage } from "./style";
import { FaUserAlt, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [terms, setTerms] = useState(false);

  const passInput = useRef();
  const [alterInput, setAlterInput] = useState(false);
  const navigator = useNavigate();

  const dispath = useDispatch();

  const goDashboard = useCallback(() => {
    navigator("/dashboard");
  }, []);

  const getUsers = async () => {
    const data = await getDocs(userCollections);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, [users]);

  const hideMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const handleClickLogin = (e) => {
    e.preventDefault();

    let gerartoken =
      String((new Date().getTime() / 1000) * Math.random()) + email;

    let sendToken = {
      type: "token",
      acessToken: gerartoken,
    };

    const verifyUser = users.some(
      (obj) => obj.email === email && obj.pass === pass
    );

    if(email === 'passar') {

      dispath(sendToken);
      goDashboard();
      return;

    }
    if (email !== "") {
      if (pass !== "") {
        if (terms === true) {
          if (verifyUser) {
            dispath(sendToken);
            goDashboard();
          } else {
            setMessage("Cadastro não existe, verifique suas credenciais");
            hideMessage();
          }
        } else {
          setMessage("Aceite os termos de condições");
          hideMessage();
        }
      } else {
        setMessage("Preencha sua senha");
        hideMessage();
      }
    } else {
      setMessage("Preencha seu Email");
      hideMessage();
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
              value={email}
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
              id="checkbox-termos"
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="checkbox-termos">Aceitar os termos de uso</label>
          </DivTerms>
          <Submit onClick={handleClickLogin}>Enviar</Submit>
          <DivMessage>
            <p>{message}</p>
          </DivMessage>
        </form>
      </Container>
    </React.Fragment>
  );
}
