import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const { token } = useSelector((rootReducer) => rootReducer.tokenReducer);

  const navigator = useNavigate();

  const backHome = useCallback(() => {

    navigator("/");

  }, []);

    console.log(token)

  if (token === undefined) {
    /*Verifica se tem token, se não tem volta para area de login */
    /*  location.href="/"
    return*/
  }

  return (
    <React.Fragment>
          <Link to="/release/">Lançamentos</Link>:   
    </React.Fragment>
  )
  
}
