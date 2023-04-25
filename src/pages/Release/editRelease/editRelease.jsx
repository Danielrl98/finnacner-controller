import React, { useState, useEffect, useCallback, useRef } from "react";
import { billsCollections, clientsCollections, db } from "../../../components/firebase/config";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import queryStrings from "query-string";
import { useLocation } from "react-router-dom";

const EditRelease = () => {

  const { search } = useLocation();
  const code = queryStrings.parse(search);
  const idCapture = Object.keys(code)[0];

  const [release, setRelease] = useState([]);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [value, setValue] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [plan, setPlan] = useState("");
  const [itsPaid, setItsPaid] = useState(false);
  const [clients,setClients] = useState([])

  const buttonHide = useRef(null)

  const handleForceClick = () => {
    buttonHide.current.click();
  };

  const getReleases = async () => {

    await getDocs(billsCollections)
    .then((data) => {

      setRelease(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     
    })
    .then ( () =>{
      console.log(release)
      setName(state => findId.map((obj) => obj.name))
      setClient(state => findId.map((obj) => obj.client))
      setValue(state => findId.map((obj) => obj.value) )
      setReleaseDate(state =>findId.map((obj) => obj.releaseDate) )
      setDueDate(state => findId.map((obj) => obj.dueDate)  )
      setPlan(state => findId.map((obj) => obj.plan) )
    })

   
  };
  
  const findId = release.filter(({ id }) => id === idCapture);
   
  const handleEditBill = async () => {

    const update = doc(db, "bills", idCapture);

      console.log(name,
        client,
        value,
        releaseDate,
        dueDate,
        plan,
        itsPaid)
    
    await updateDoc(update, {
      name,
      client,
      value,
      releaseDate,
      dueDate,
      plan,
      itsPaid
    })
      .then(() => {     
        alert("Atualizado com sucesso");
        getReleases()
      })
      .catch(() => {
        alert("erro");
      });
  };
  const getClients = async () => {

    const data = await getDocs(clientsCollections)
    
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
  }
  useEffect( () =>{
    getReleases()

    setTimeout( () =>{

      handleForceClick()

    },3000)
    getClients()
    
  },[])
  
  return (
    <React.Fragment>
      <h1>Criar Lançamento</h1>
      <div>
        <div>
          <label htmlFor="name-bill">Nome da conta</label>
          <input
            type="text"
            id="name_bill"
            value={ name }
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="client">Nome do cliente</label>
          <select
            type="text"
            id="client"
            value={ client }
            onChange={(e) => setClient(e.target.value)}
          >
            {clients.map(client => <option key={client.length} value={client.name}>{client.name}</option> ) 
            }
          </select>
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            id="value"
            value={ value }
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="release_date">Data de lançamento</label>
          <input
            type="date"
            id="release_date"
            value={ releaseDate }
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="due_date">Data de vencimento</label>
          <input
            type="date"
            id="due_date"
            value={ dueDate }
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="plain_account">Planos de contas</label>
          <select
            
            id="plain_account"
            value={ plan }
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="Despesa">Despesa</option>
            <option value="Despesa">Receita</option>
          </select>
        </div>
        <div>
          <label htmlFor="its_paid">está pago?</label>
          { findId.map((obj) =>
                obj.itsPaid ? (
                  <div key={obj.id}>
                    <input type="checkbox" id="its_paid" checked
                     onChange={(e) => setItsPaid(e.target.checked)}
                    ></input>
                  </div>
                ) : (
                  <div key={obj.id}>
                    <input type="checkbox" id="its_paid"
                    checked={ itsPaid }
                     onChange={(e) => setItsPaid(e.target.checked)}
                    ></input>
                  </div>
                )
              )
            }
        </div>
        <div>
          <button onClick={handleEditBill}>Criar</button>
          <button 
          ref={ buttonHide } onClick={ getReleases } 
          style={{visibility:" hidden"}}
          >Atualizar</button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditRelease;
