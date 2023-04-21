import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userCollections } from "../../components/firebase/users";
import { addDoc, getDocs } from "firebase/firestore";

export default function Register() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [messagem, setMensagem] = useState("");

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

/*Cria os usuários */

  const handleClickCreate = async () => {
    const verificaEmailExiste = users.some((obj) => obj.email === email);

    if (verificaEmailExiste) {
      alert("email já existe, tente outro email");
    } else {
      const addUser = await addDoc(userCollections, {
        name,
        email,
        pass,
      });
      if (addUser) {
        getUsers();
        setMensagem("usuário criado com sucesso");
      } else {
        alert("erro tente novamente");
      }
    }
  };

  return (
    <React.Fragment>
      <h1>Registro</h1>
      <div>
        <label htmlFor="user"> usuário </label>
        <input
          type="text"
          id="user"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email"> Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="senha"> Senha</label>
        <input
          type="text"
          id="senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button onClick={handleClickCreate}>Enviar</button>
      <p>{messagem} </p>
      {messagem ? <button onClick={GoLogin}>Fazer Login</button> : <p></p>}
    </React.Fragment>
  );
}
