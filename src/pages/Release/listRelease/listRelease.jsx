import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { billsCollections } from "../../../components/firebase/users";
import { doc, getDocs } from "firebase/firestore";

export default function ListRelease() {
  const [release, setRelease] = useState([]);

  const getUsers = async () => {
    const data = await getDocs(billsCollections);

    setRelease(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);

  
  return (
    <React.Fragment>
      <Link to="/release/create">Criar Lançamento</Link>
      <div>Lista de lançamentos</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Data de lançamento</th>
              <th>Data de vencimento</th>
              <th>Plano de contas</th>
              <th>Quitado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           {release.map((releases) => {
            return(
                <tr key={releases.id}>
                    <td>{releases.client}</td>
                    <td>{releases.value}</td>
                    <td>{releases.releaseDate}</td>
                    <td>{releases.dueDate}</td>
                    <td>{releases.plan}</td>
                    <td>{releases.itsPaid ? 'Pago' : 'Não pago'}</td>
                    <td><a href={'/release/edit?' + releases.id}>Editar</a></td>
                </tr>
            )
           })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
