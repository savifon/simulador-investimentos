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

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    handleIndicadores();
  }, [loading]);

  const handleIndicadores = async () => {
    const response = await getIndicadores();
    setIndicadores(response.data);

    setLoading(false);
  };

  const simulacao = async (rendimento, indexacao) => {
    setLoading(true);

    const response = await getSimulacao(rendimento, indexacao);
    const resultado = response.data;
    console.log(response.data);

    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    simulacao(data.get("rendimento"), data.get("indexacao"));
  };

  const inputValidation = (input) => {};

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
                  />
                  <label htmlFor="bruto">Bruto</label>
                </RadioInput>

                <RadioInput>
                  <input
                    type="radio"
                    name="rendimento"
                    id="liquido"
                    value="liquido"
                  />
                  <label htmlFor="liquido">Líquido</label>
                </RadioInput>
              </GroupInput>

              <label htmlFor="aporte_inicial">Aporte Inicial</label>
              <Input type="text" name="aporte_inicial" id="aporte_inicial" />

              <label htmlFor="prazo">Prazo (em meses)</label>
              <Input type="text" name="prazo" id="prazo" />

              <label htmlFor="ipca">IPCA (ao ano)</label>
              <Input
                readOnly
                type="text"
                name="ipca"
                id="ipca"
                defaultValue="1111%"
              />
            </FlexColumn>

            <FlexColumn>
              <p>Tipos de indexação [i]</p>

              <GroupInput>
                <RadioInput>
                  <input type="radio" name="indexacao" id="pre" value="pre" />
                  <label htmlFor="pre">PRÉ</label>
                </RadioInput>
                <RadioInput>
                  <input type="radio" name="indexacao" id="pos" value="pos" />
                  <label htmlFor="pos">PÓS</label>
                </RadioInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="indexacao"
                    id="fixado"
                    value="ipca"
                  />
                  <label htmlFor="fixado">FIXADO</label>
                </RadioInput>
              </GroupInput>

              <label htmlFor="aporte_mensal">Aporte Mensal</label>
              <Input type="text" name="aporte_mensal" id="aporte_mensal" />

              <label htmlFor="rentabilidade">Rentabilidade</label>
              <Input type="text" name="rentabilidade" id="rentabilidade" />

              <label htmlFor="cdi">CDI (ao ano)</label>
              <Input
                readOnly
                type="text"
                name="cdi"
                id="cdi"
                defaultValue="2222222%"
              />
            </FlexColumn>
          </Box>

          <Box>
            <Button type="reset">Limpar campos</Button>
            <Button type="submit">Simular</Button>
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
          <Card title="Valor final Bruto" text="R$ 15.509,27" />
          <Card title="Alíquota do IR" text="20%" />
          <Card title="Valor Pago em IR" text="R$ 1.509,27" />
          <Card title="Valor Final Líquido" text="R$ 56.509,27" />
          <Card title="Valor Total Investido" text="R$ 9.509,27" />
          <Card title="Ganho Líquido" text="R$ 47.000,00" />
        </div>

        <h3>Projeção de Valores</h3>
        <div>
          <h4>Gráfico</h4>
        </div>
      </FlexColumn>
    </Box>
  );
};

export default Home;
