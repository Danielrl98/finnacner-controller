import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userCollections } from "../../components/firebase/config";
import { addDoc, getDocs } from "firebase/firestore";
import { Input,Label,Container, DivTerms, Submit, DivMessage } from "../../theme/theme";
import { Link } from "react-router-dom";

export default function Register() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);

  const navigator = useNavigate();

  const GoLogin = useCallback(() => {
    navigator("/");
  }, []);

/*Capturar os usuarios*/
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
/*Cria os usuários */
  const handleClickCreate = async () => {

    if(name == '') return  hideMessage("Usuário vazio tente novamente")
    if(email == '') return  hideMessage("Email vazio tente novamente")
    if(pass == '')  return  hideMessage("Senha vazia tente novamente")
    if(terms == '') return  hideMessage("Aceite os termos de uso")

    const verificaEmailExiste = users.some((obj) => obj.email === email);

    if (verificaEmailExiste) {
      
      hideMessage("Email já existe tente outro")
    } else {
      const addUser = await addDoc(userCollections, {
        name,
        email,
        pass,
      });
      if (addUser) {
        getUsers();  
        hideMessage("usuário criado com sucesso")
      } else {
        hideMessage("Erro")
      }
    }

   
  };

  return (
    <React.Fragment>
      <Container>
      <div>
        <Label htmlFor="user"> usuário </Label>
        <Input
          type="text"
          id="user"
          placeholder="Nome do usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email"> Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Seu melhor email"
          value={email.toLowerCase()}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div>
        <Label htmlFor="senha"> Senha</Label>
        <Input
          type="text"
          id="senha"
          placeholder="Sua Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
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
      <Submit onClick={handleClickCreate}>Enviar</Submit>
     
      <DivMessage>
        <p>{message} </p>
      </DivMessage>

      <div style={{textAlign:"center"}}>
            Já tem uma conta? <Link to="/">Fazer Login</Link>
      </div>
      </Container>
    </React.Fragment>
  );
}
