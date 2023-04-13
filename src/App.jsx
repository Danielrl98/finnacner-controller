import React from "react";
import Rotas from "./routes/routes";
import Header from "./components/header/header";

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Rotas />
    </React.Fragment>
  );
}
