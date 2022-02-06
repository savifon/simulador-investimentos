import React from "react";

import Header from "./components/Header";
import Simulacao from "./pages/Simulacao";

import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <Header title="Simulador de Investimentos" />
      <Simulacao />
      <GlobalStyle />
    </>
  );
}

export default App;
