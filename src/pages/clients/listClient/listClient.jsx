import React, { useEffect, useState } from 'react'
import { clientsCollections } from '../../../components/firebase/config'
import { getDocs } from 'firebase/firestore'
export default function ListClient() {

    const [clients,setClients] = useState([])

    const getClients = async () =>{
        await getDocs(clientsCollections)
        .then((data) => {

            setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     
        })

    }
    useEffect( () =>{
        getClients()
    },[])
    return(
        <React.Fragment>
            <h1>Lista de clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {clients.map((client,index) =>(
                        <tr key={client.id}>
                             <td>{client.cpf}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td><a href="/">Editar</a></td>
                        </tr>
                        ))}
                </tbody>
            </table>

        </React.Fragment>
    )
}