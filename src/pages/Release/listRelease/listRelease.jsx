import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { billsCollections, db } from "../../../components/firebase/config";
import { deleteDoc, doc, getDocs } from "firebase/firestore";

export default function ListRelease() {
  const [release, setRelease] = useState([]);

  const getBills = async () => {
    const data = await getDocs(billsCollections);

    setRelease(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getBills();
  }, []);

  const handleDeleteDocs = async (id) => {
    const data = doc(db, "bills", id);
    await deleteDoc(data).then(() => {
      getBills();
    });
  };
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {release.map((releases) => {
              return (
                <tr key={releases.id}>
                  <td>{releases.client}</td>
                  <td>{releases.value}</td>
                  <td>{releases.releaseDate}</td>
                  <td>{releases.dueDate}</td>
                  <td>{releases.plan}</td>
                  <td>{releases.itsPaid ? "Pago" : "Não pago"}</td>
                  <td>
                    <a href={"/release/edit?" + releases.id}>Editar</a>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteDocs(releases.id)}>
                      {" "}
                      Excluir{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
