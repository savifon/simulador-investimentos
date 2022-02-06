import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getIndicadores, getSimulacao } from "../../services/api";

import {
  Box,
  Title,
  FlexColumn,
  Button,
  RadioInput,
  GroupInput,
} from "./styles";
import Card from "../../components/Card";
import StackedBarChart from "../../components/Chart/";

const regexFloat = /^([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)(,[0-9][0-9])?$/g;
const regexInteger = /^[0-9]*$/;

const simulacaoSchema = Yup.object().shape({
  rendimento: Yup.string().required("Rendimento é obrigatório"),
  aporte_inicial: Yup.string()
    .required("Aporte Inicial é obrigatório")
    .matches(regexFloat, "Aporte Inicial deve ser um número"),
  prazo: Yup.string()
    .required("Prazo é obrigatório")
    .matches(regexInteger, "Informe um prazo válido"),
  ipca: Yup.string().required("IPCA é obrigatório"),
  indexacao: Yup.string().required("Indexação é obrigatório"),
  aporte_mensal: Yup.string()
    .required("Aporte Mensal é obrigatório")
    .matches(regexFloat, "Aporte Mensal deve ser um número"),
  rentabilidade: Yup.string()
    .required("Rentabilidade é obrigatório")
    .matches(regexFloat, "Rentabilidade deve ser um número"),
  cdi: Yup.string().required("CDI é obrigatório"),
});

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [ipca, setIpca] = useState("");
  const [cdi, setCdi] = useState("");

  const initialValues = {
    rendimento: "",
    aporte_inicial: "",
    prazo: "",
    ipca: ipca,
    indexacao: "",
    aporte_mensal: "",
    rentabilidade: "",
    cdi: cdi,
  };

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

  const handleSubmit = () => {
    const data = new FormData();

    simulacao(data.get("rendimento"), data.get("indexacao"));
  };

  return (
    <Box style={{ padding: "30px 60px" }}>
      <FlexColumn>
        <Title>Simulador</Title>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={simulacaoSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <Form id="formSimulacao">
                <Box>
                  <FlexColumn>
                    <div>
                      <p>Rendimento [i]</p>
                      <GroupInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="rendimento"
                            id="bruto"
                            value="bruto"
                          />
                          <label htmlFor="bruto">Bruto</label>
                        </RadioInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="rendimento"
                            id="liquido"
                            value="liquido"
                          />
                          <label htmlFor="liquido">Líquido</label>
                        </RadioInput>
                      </GroupInput>
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div
                      className={
                        errors.aporte_inicial && touched.aporte_inicial
                          ? "error"
                          : null
                      }
                    >
                      <label htmlFor="aporte_inicial">Aporte Inicial</label>
                      <Field
                        type="text"
                        name="aporte_inicial"
                        id="aporte_inicial"
                        className="money"
                      />
                      <span className="placeholder">R$</span>
                      <ErrorMessage
                        name="aporte_inicial"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div
                      className={errors.prazo && touched.prazo ? "error" : null}
                    >
                      <label htmlFor="prazo">Prazo</label>
                      <Field type="text" name="prazo" id="prazo" />
                      <ErrorMessage
                        name="prazo"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div
                      className={errors.ipca && touched.ipca ? "error" : null}
                    >
                      <label htmlFor="prazo">IPCA (ao ano)</label>
                      <Field
                        type="text"
                        name="ipca"
                        id="ipca"
                        className="percent"
                        readOnly
                      />
                      <span className="placeholder">%</span>
                      <ErrorMessage
                        name="ipca"
                        component="span"
                        className="error"
                      />
                    </div>
                  </FlexColumn>

                  <FlexColumn>
                    <div>
                      <p>Tipos de indexação [i]</p>
                      <GroupInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="indexacao"
                            id="pre"
                            value="pre"
                          />
                          <label htmlFor="pre">PRÉ</label>
                        </RadioInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="indexacao"
                            id="pos"
                            value="pos"
                          />
                          <label htmlFor="pos">PÓS</label>
                        </RadioInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="indexacao"
                            id="fixado"
                            value="ipca"
                          />
                          <label htmlFor="fixado">FIXADO</label>
                        </RadioInput>
                      </GroupInput>
                      <ErrorMessage
                        name="indexacao"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div
                      className={
                        errors.aporte_mensal && touched.aporte_mensal
                          ? "error"
                          : null
                      }
                    >
                      <label htmlFor="aporte_mensal">Aporte Mensal</label>
                      <Field
                        type="text"
                        name="aporte_mensal"
                        id="aporte_mensal"
                        className="money"
                      />
                      <span className="placeholder">R$</span>
                      <ErrorMessage
                        name="aporte_mensal"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div
                      className={
                        errors.rentabilidade && touched.rentabilidade
                          ? "error"
                          : null
                      }
                    >
                      <label htmlFor="rentabilidade">Rentabilidade</label>
                      <Field
                        type="text"
                        name="rentabilidade"
                        id="rentabilidade"
                        className="percent"
                      />
                      <span className="placeholder">%</span>
                      <ErrorMessage
                        name="rentabilidade"
                        component="span"
                        className="error"
                      />
                    </div>

                    <div className={errors.cdi && touched.cdi ? "error" : null}>
                      <label htmlFor="cdi">CDI (ao ano)</label>
                      <Field
                        type="text"
                        name="cdi"
                        id="cdi"
                        className="percent"
                        readOnly
                      />
                      <span className="placeholder">%</span>
                      <ErrorMessage
                        name="cdi"
                        component="span"
                        className="error"
                      />
                    </div>
                  </FlexColumn>
                </Box>

                <Box style={{ marginTop: "40px" }}>
                  <Button type="reset" onClick={() => setChart(null)}>
                    Limpar campos
                  </Button>
                  <Button
                    type="submit"
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Simular
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </FlexColumn>

      <FlexColumn>
        {chart ? (
          <>
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
          </>
        ) : (
          <div></div>
        )}
      </FlexColumn>
    </Box>
  );
};

export default Home;
