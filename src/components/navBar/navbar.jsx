import React from "react";
import { AiOutlineBorderInner } from "react-icons/ai";
import { NavGrid } from "./style";
import { Titulo,Links } from './style'
import { FaUserFriends } from 'react-icons/fa'
export default function Navbar() {


  return (
    <React.Fragment>
      <NavGrid>
        <main>
          <div>
            <Titulo>
              <AiOutlineBorderInner style={{ fontSize: "30px" }} />  <span>Main menu</span>
            </Titulo>
            <Links>
              <FaUserFriends /> <a href="/dashboard">Dashboard</a>
            </Links>
            <Links>
              <FaUserFriends /> <a href="/clients/create">Criar cliente</a>
            </Links>
            <Links>
              <FaUserFriends /> <a href="/clients">Clientes</a>
            </Links>
            <Links>
              <FaUserFriends /> <a href="/release/create">Criar Lançamento</a>
            </Links>
            <Links>
              <FaUserFriends /> <a href="/release">Lançamentos</a>
            </Links>
          </div>
        </main>
      </NavGrid>
    </React.Fragment>
  );
}
