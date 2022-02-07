import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Simulador from "./index";

function renderSimulador() {
  return render(<Simulador />);
}

describe("Página Simulador", () => {
  test("Deve conter o título de introdução do formulário", () => {
    renderSimulador();

    const welcomeText = screen.getByText("Simulador");
    expect(welcomeText).toBeInTheDocument();
  });

  test("Deve conter o input para o Aporte Mensal", () => {
    renderSimulador();

    const inputAporteMensal = screen.getByRole("radio", {
      name: "aporte_mensal",
    });
    expect(inputAporteMensal).toBeInTheDocument();
  });
});
