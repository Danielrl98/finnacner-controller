import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token } = useSelector((rootReducer) => rootReducer.tokenReducer);

  const navigator = useNavigate();

  const backHome = useCallback(() => {
    navigator("/");
  }, []);

  if (token === undefined) {
    backHome();
    return;
  }

  return (
    <React.Fragment>
            Seja bem vindo
    </React.Fragment>
  )
  
}
