import React, { useState } from "react";
import { billsCollections } from "../../../components/firebase/users";
import { addDoc } from "firebase/firestore";


const Addrelease = () => {
  let id = String((new Date().getTime() / 1000) * Math.random())
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [value, setValue] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [plan, setPlan] = useState("");
  const [itsPaid, setItsPaid] = useState(false);
  
  const handleCreateBill = async () =>{

    const data = await addDoc(billsCollections,{
        id,
        name,
        client,
        value,
        releaseDate,
        dueDate,
        plan,
        itsPaid
    }) .then( () => {
        alert('criado com sucesso')
    }).catch( () => {
        alert('erro')
    })
    
}

  return (
    <React.Fragment>
      <h1>Criar Lançamento</h1>
      <div>
        <div>
          <label htmlFor="name-bill">Nome da conta</label>
          <input
            type="text"
            id="name_bill"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="client">Nome do cliente</label>
          <input
            type="text"
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="release_date">Data de lançamento</label>
          <input
            type="date"
            id="release_date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="due_date">Data de vencimento</label>
          <input
            type="date"
            id="due_date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="plain_account">Planos de contas</label>
          <select
            id="plain_account"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>
        </div>
        <div>
          <label htmlFor="its_paid">está pago?</label>
          <input
            type="checkbox"
            id="its_paid"
            value={itsPaid}
            onChange={(e) => setItsPaid(e.target.checked)}
          />
        </div>
        <div>
            <button onClick= {  handleCreateBill }>Criar</button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Addrelease;
