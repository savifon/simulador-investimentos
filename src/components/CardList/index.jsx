import React from "react";

import Card from "../../components/Card";
import { brl } from "../../utils/js/functions";

const CardList = ({ simulacao }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "space-between",
      }}
    >
      <Card title="Valor final Bruto" text={brl(simulacao.valorFinalBruto)} />
      <Card title="Alíquota do IR" text={`${simulacao.aliquotaIR}%`} />
      <Card title="Valor Pago em IR" text={brl(simulacao.valorPagoIR)} />
      <Card
        title="Valor Final Líquido"
        text={brl(simulacao.valorFinalLiquido)}
        bold
      />
      <Card
        title="Valor Total Investido"
        text={brl(simulacao.valorTotalInvestido)}
      />
      <Card title="Ganho Líquido" text={brl(simulacao.ganhoLiquido)} bold />
    </div>
  );
};

export default CardList;
