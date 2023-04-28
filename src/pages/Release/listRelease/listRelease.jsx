import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { billsCollections, db } from "../../../components/firebase/config";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { Container, TableWrapper,Table,Thead,Tbody ,Td,Th,Tr } from "./style";
export default function ListRelease() {

  const [release, setRelease] = useState([]);
  const [filter,setFilter] = useState('')

  const getBills = async () => {


     await getDocs(billsCollections)
     .then ( (response) =>  response)
     .then( data =>{
    

      let response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
      let reg = new RegExp(filter, "gi")
      console.log(response)
      const filterobj = response.filter(function(r) {
        
        if((r.client).match(reg) && response.length !== 0){
           return r.client
        }
        
      })

      setRelease(filterobj)
   
     } )

 
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
      <Container>
      <Link to="/release/create">Criar Lançamento</Link>
      <div>Lista de lançamentos</div>
     
        <div>
          <input 
          type="text" 
          placeholder="pesquisar" 
      
          onChange={e=>setFilter(e.target.value)}/>

          <button onClick={ getBills }>Pesquisar</button>
        </div>
      
      <TableWrapper>
        <Table >
          <Thead>
            <tr>
              <Th style={{width:'20%'}}>Cliente</Th>
              <Th style={{width:'10%'}}>Valor</Th>
              <Th style={{width:'15%'}}>Data de lançamento</Th>
              <Th style={{width:'15%'}}>Data de vencimento</Th>
              <Th style={{width:'15%'}}>Plano de contas</Th>
              <Th style={{width:'15%'}}>Quitado</Th>
              <Th style={{width:'5%'}}></Th>
              <Th style={{width:'5%'}}></Th>
            </tr>
          </Thead>
          <Tbody>
            {release.map((releases,i) => {
              return (
                <Tr key={i}>
                  <Td  style={{width:'20%'}}>{releases.client}</Td>
                  <Td >{releases.value}</Td>
                  <Td>{releases.releaseDate}</Td>
                  <Td >{releases.dueDate}</Td>
                  <Td >{releases.plan}</Td>
                  <Td>{releases.itsPaid ? "Pago" : "Não pago"}</Td>
                  <Td >
                    <a href={"/release/edit?" + releases.id}>Editar</a>
                  </Td>
                  <Td >
                    <button onClick={() => handleDeleteDocs(releases.id)}>
                      {" "}
                      Excluir{" "}
                    </button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table >  
      </TableWrapper>
      </Container>
    </React.Fragment>
  );
}
