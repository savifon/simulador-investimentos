import { useEffect, useState } from "react";

import { getIndicadores, getSimulacao } from "../../services/api";

import {
  Box,
  Title,
  FlexColumn,
  Input,
  Button,
  RadioInput,
  GroupInput,
} from "./styles";
import Card from "../../components/Card";
import StackedBarChart from "../../components/Chart/";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [ipca, setIpca] = useState(null);
  const [cdi, setCdi] = useState(null);

  const [aporteInicial, setAporteInicial] = useState("");
  const [aporteInicialErr, setAporteInicialErr] = useState({});
  const [aporteMensal, setAporteMensal] = useState("");
  const [aporteMensalErr, setAporteMensalErr] = useState({});
  const [prazo, setPrazo] = useState("");
  const [prazoErr, setPrazoErr] = useState({});
  const [rentabilidade, setRentabilidade] = useState("");
  const [rentabilidadeErr, setRentabilidadeErr] = useState({});

  const [valorFinalBruto, setValorFinalBruto] = useState(null);
  const [aliquotaIR, setAliquotaIR] = useState(null);
  const [valorPagoIR, setValorPagoIR] = useState(null);
  const [valorTotalInvestido, setValorTotalInvesvido] = useState(null);
  const [valorFinalLiquido, setValorFinalLiquido] = useState(null);
  const [ganhoLiquido, setGanhoLiquido] = useState(null);

  const [chart, setChart] = useState(null);

  useEffect(() => {
    handleIndicadores();
  }, [loading]);

  const handleIndicadores = async () => {
    const response = await getIndicadores();
    setCdi(response.data[0].valor);
    setIpca(response.data[1].valor);

    setLoading(false);
  };

  const simulacao = async (rendimento, indexacao) => {
    const response = await getSimulacao(rendimento, indexacao);
    const resultado = response.data[0];

    setValorFinalBruto(resultado.valorFinalBruto);
    setAliquotaIR(resultado.aliquotaIR);
    setValorPagoIR(resultado.valorPagoIR);
    setValorTotalInvesvido(resultado.valorTotalInvestido);
    setValorFinalLiquido(resultado.valorFinalLiquido);
    setGanhoLiquido(resultado.ganhoLiquido);

    const dataComAporte = resultado.graficoValores.comAporte;
    const dataSemAporte = resultado.graficoValores.semAporte;
    const dataChart = formatDataGraph(dataComAporte, dataSemAporte);

    setChart(
      <StackedBarChart
        data={dataChart}
        keyX="tempo"
        legendX="Tempo (meses)"
        legendY="Valor (R$)"
        dataKeyA="valorSemAporte"
        legendA="Sem Aporte"
        colorA="#000000"
        dataKeyB="valorComAporte"
        legendB="Com Aporte"
        colorB="#ed8e53"
      />
    );
  };

  const formatDataGraph = (dataCA, dataSA) => {
    let data = [];

    for (var item in dataCA) {
      data.push({
        tempo: item,
        valorComAporte: dataCA[item].toFixed(2),
        valorSemAporte: dataSA[item].toFixed(2),
      });
    }

    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    simulacao(data.get("rendimento"), data.get("indexacao"));
  };

  const inputValidation = (value, setState) => {
    if (!/^[0-9,.]*$/g.test(value)) {
      setState({ msg: "Deve ser um número", class: "inputErr" });
      return true;
    } else {
      setState({ msg: "", class: "inputValid" });
      return false;
    }
  };

  return (
    <Box style={{ padding: "30px" }}>
      <FlexColumn>
        <Title>Simulador</Title>

        <form id="formSimulacao" name="formSimulacao" onSubmit={handleSubmit}>
          <Box>
            <FlexColumn>
              <p>Rendimento [i]</p>

              <GroupInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="rendimento"
                    id="bruto"
                    value="bruto"
                    required
                  />
                  <label htmlFor="bruto">Bruto</label>
                </RadioInput>

                <RadioInput>
                  <input
                    type="radio"
                    name="rendimento"
                    id="liquido"
                    value="liquido"
                    required
                  />
                  <label htmlFor="liquido">Líquido</label>
                </RadioInput>
              </GroupInput>

              <label
                className={aporteInicialErr.class}
                htmlFor="aporte_inicial"
              >
                Aporte Inicial
              </label>
              <Input
                type="text"
                name="aporte_inicial"
                id="aporte_inicial"
                value={aporteInicial}
                onChange={(e) => {
                  inputValidation(e.target.value, setAporteInicialErr);
                  setAporteInicial(e.target.value);
                }}
                required
              />
              <span className={aporteInicialErr.class}>
                {aporteInicialErr.msg}
              </span>

              <label className={prazoErr.class} htmlFor="prazo">
                Prazo (em meses)
              </label>
              <Input
                type="text"
                name="prazo"
                id="prazo"
                value={prazo}
                onChange={(e) => {
                  inputValidation(e.target.value, setPrazoErr);
                  setPrazo(e.target.value);
                }}
                required
              />
              <span className={prazoErr.class}>{prazoErr.msg}</span>

              <label htmlFor="ipca">IPCA (ao ano)</label>
              <Input
                readOnly
                type="text"
                name="ipca"
                id="ipca"
                defaultValue={ipca}
                required
              />
            </FlexColumn>

            <FlexColumn>
              <p>Tipos de indexação [i]</p>

              <GroupInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="indexacao"
                    id="pre"
                    value="pre"
                    required
                  />
                  <label htmlFor="pre">PRÉ</label>
                </RadioInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="indexacao"
                    id="pos"
                    value="pos"
                    required
                  />
                  <label htmlFor="pos">PÓS</label>
                </RadioInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="indexacao"
                    id="fixado"
                    value="ipca"
                    required
                  />
                  <label htmlFor="fixado">FIXADO</label>
                </RadioInput>
              </GroupInput>

              <label className={aporteMensalErr.class} htmlFor="aporte_mensal">
                Aporte Mensal
              </label>
              <Input
                type="text"
                name="aporte_mensal"
                id="aporte_mensal"
                value={aporteMensal}
                onChange={(e) => {
                  inputValidation(e.target.value, setAporteMensalErr);
                  setAporteMensal(e.target.value);
                }}
                required
              />
              <span className={aporteMensalErr.class}>
                {aporteMensalErr.msg}
              </span>

              <label className={rentabilidadeErr.class} htmlFor="rentabilidade">
                Rentabilidade
              </label>
              <Input
                type="text"
                name="rentabilidade"
                id="rentabilidade"
                value={rentabilidade}
                onChange={(e) => {
                  inputValidation(e.target.value, setRentabilidadeErr);
                  setRentabilidade(e.target.value);
                }}
                required
              />
              <span className={rentabilidadeErr.class}>
                {rentabilidadeErr.msg}
              </span>

              <label htmlFor="cdi">CDI (ao ano)</label>
              <Input
                readOnly
                type="text"
                name="cdi"
                id="cdi"
                defaultValue={cdi}
                required
              />
            </FlexColumn>
          </Box>

          <Box>
            <Button type="reset">Limpar campos</Button>
            <Button disabled type="submit">
              Simular
            </Button>
          </Box>
        </form>
      </FlexColumn>

      <FlexColumn>
        <h2>Resultado da Simulação</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <Card title="Valor final Bruto" text={valorFinalBruto} />
          <Card title="Alíquota do IR" text={aliquotaIR} />
          <Card title="Valor Pago em IR" text={valorPagoIR} />
          <Card
            title="Valor Final Líquido"
            text={valorFinalLiquido}
            textColor="green"
            bold
          />
          <Card title="Valor Total Investido" text={valorTotalInvestido} />
          <Card
            title="Ganho Líquido"
            text={ganhoLiquido}
            textColor="green"
            bold
          />
        </div>

        <h3>Projeção de Valores</h3>
        {chart}
      </FlexColumn>
    </Box>
  );
};

export default Home;
