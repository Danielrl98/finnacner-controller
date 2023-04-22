import React, { useEffect, useState } from "react";
import { clientsCollections } from "../../../components/firebase/config";
import { addDoc } from "firebase/firestore";

export default function AddClient() {
  const id = String((new Date().getTime() / 1000) * Math.random());

  const [cpf,setCpf] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState([]);

  const [inputs, setInputs] = useState([""]);

  function handleAddInput() {
    const novoInput = "";
    setInputs([...inputs, novoInput]);
    
  }

  function handleRemoveInput(index) {
    const novosInputs = [...inputs];
    novosInputs.splice(index, 1);
    setInputs(novosInputs);
  }

  function handleChangeInput(event, index) {
    const novosInputs = [...inputs];
    novosInputs[index] = event.target.value;
    setInputs(novosInputs);
    setContact(inputs)
  }

  const searchCep = async (cep) => {
    await fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .then((data) =>{ 
        setStreet(data.logradouro)  
        setDistrict(data.bairro) 
        setCity(data.localidade) 
    })
      .catch((error) => console.error(error));
  };

  const handleCreateClient = async ( ) =>{

 await addDoc(clientsCollections,{
    id,
    cpf,
    name,
    email,
    cep,
    street,
    number,
    district, 
    city, 
    contact,
    })
    .then ( () =>{
        alert('criado com sucesso')
    })
    .catch ( () => {
        alert('error')
    })


  }
  


  return (
    <React.Fragment>
      <div>
        <label htmlFor="cpf">CPF / CNPJ </label>
        <input
         type="text" 
         id="number"
         value={cpf}
         onChange={e => setCpf(e.target.value)}
         />
      </div>
      <div>
        <label htmlFor="name">Nome do cliente</label>
        <input
         type="text" 
         id="name"
         value={name}
         onChange={e => setName(e.target.value)}
         />
      </div>
      <div>
        <label htmlFor="email">Email do cliente</label>
        <input 
        type="email"
        id="email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
         />
      </div>
      <div>
        <label htmlFor="cep">Cep</label>
        <input
          type="number"
          id="cep"
          value={cep}
          onChange={e => setCep(e.target.value)}
        />
        <button onClick={() => searchCep(cep)}>pesquisar Cep</button>
      </div>
      <div>
        <label htmlFor="street">Endereço</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={e => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numero">Numero</label>
        <input 
        type="text" 
        id="numero"
        value={number}
        onChange={e => setNumber(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro</label>
        <input 
        type="text" 
        id="bairro"
        value={district}
        onChange={e => setDistrict(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade</label>
        <input 
        type="text" 
        id="cidade" 
        value={city}
        onChange={e => setCity(e.target.value)}
        />
      </div>
      <button onClick={handleAddInput}>Adicionar Contato</button>
      {inputs.map((valor, index) => (
        <div key={index}>
          <label htmlFor={"contato" + index}>Contato</label>
          <input
            id={"contato" + index}
            type="text"
            value={valor}
            onChange={(event) => handleChangeInput(event, index)}
          />
          <button onClick={() => handleRemoveInput(index)}>Excluir</button>
         
        </div>
       
      ))}
       <div>
            <button onClick={handleCreateClient }>Criar</button>
       </div>
    </React.Fragment>
  );
}
