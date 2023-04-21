import React, { useState, useEffect } from "react";
import { billsCollections, db } from "../../../components/firebase/users";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import queryStrings from "query-string";
import { useLocation } from "react-router-dom";

const EditRelease = () => {
  const { search } = useLocation();
  const code = queryStrings.parse(search);
  const idCapture = Object.keys(code)[0];
  const [release, setRelease] = useState([]);

  const getUsers = async () => {
    const data = await getDocs(billsCollections);

    setRelease(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
 
  useEffect( () =>{
    getUsers();
  },[]) 
  
  const findId = release.filter(({ id }) => id === idCapture);
 
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [value, setValue] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [plan, setPlan] = useState("");
  const [itsPaid, setItsPaid] = useState(false);

  const handleEditBill = async () => {
    const update = doc(db, "bills", idCapture);

    await updateDoc(update, {
      name,
      client,
      value,
      releaseDate,
      dueDate,
      plan,
      itsPaid,
    })
      .then(() => {
        alert("atualizado com sucesso");
      })
      .catch(() => {
        alert("erro");
      });
  };

  return (
    <React.Fragment>
      <h1>Criar Lançamento</h1>
      <div>
        <div>
          <label htmlFor="name-bill">Nome da conta</label>
          <input
            type="text"
            id="name_bill"
            value={ findId.map((obj) => obj.name) }
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="client">Nome do cliente</label>
          <input
            type="text"
            id="client"
            value={ findId.map((obj) => obj.client) }
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            id="value"
            value={ findId.map((obj) => obj.value) }
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="release_date">Data de lançamento</label>
          <input
            type="date"
            id="release_date"
            value={ findId.map((obj) => obj.releaseDate) }
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="due_date">Data de vencimento</label>
          <input
            type="date"
            id="due_date"
            value={ findId.map((obj) => obj.dueDate) }
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="plain_account">Planos de contas</label>
          <input
            type="text"
            id="plain_account"
            value={ findId.map((obj) => obj.plan) }
            onChange={(e) => setPlan(e.target.value)}
            disabled
          >
          </input>
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
                  <div>
                    <input type="checkbox" id="its_paid"
                     onChange={(e) => setItsPaid(e.target.checked)}
                    ></input>
                  </div>
                )
              )
            }
        </div>
        <div>
          <button onClick={handleEditBill}>Criar</button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditRelease;
