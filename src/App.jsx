import React from "react";

import Header from "./components/Header";
import Simulador from "./pages/Simulador";

import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <Header title="Simulador de Investimentos" />
      <Simulador />
      <GlobalStyle />
    </>
  );
}

export default App;
