import GlobalStyle from "./styles/global";

import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header title="Simulador de Investimentos" />
      <Home />
      <GlobalStyle />
    </>
  );
}

export default App;
