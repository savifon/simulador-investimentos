import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Simulador from "./index";

let container = null;
beforeEach(() => {
  // configurar o elemento do DOM como o alvo da renderização
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("Renderizando o título do formulário", () => {
  act(() => {
    render(<Simulador />, container);
  });
  expect(container.textContent).toBe("Simulador");
});
