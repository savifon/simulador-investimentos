import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { MdInfoOutline } from "react-icons/md";

import {
  Box,
  Title,
  FlexColumn,
  Button,
  RadioInput,
  GroupInput,
} from "./styles";

import CardList from "../../components/CardList";
import FieldInput from "../../components/FieldInput";
import StackedBarChart from "../../components/Chart";

import { simulacaoSchema } from "../../utils/js/schemas";

import { getIndicadores, getSimulacao } from "../../services/api";

const Simulador = () => {
  const [ipca, setIpca] = useState("");
  const [cdi, setCdi] = useState("");
  const [simulacao, setSimulacao] = useState({});
  const simulacaoRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    handleIndicadores();
  }, []);

  const handleIndicadores = async () => {
    await getIndicadores().then((response) => {
      setCdi(response.data[0].valor);
      setIpca(response.data[1].valor);
    });
  };

  const handleSimulacao = async (rendimento, indexacao) => {
    await getSimulacao(rendimento, indexacao).then((response) => {
      const resultado = response.data[0];
      setSimulacao(resultado);

      const dataChart = formatDataGraph(
        resultado.graficoValores.comAporte,
        resultado.graficoValores.semAporte
      );

      setChart(
        <StackedBarChart
          data={dataChart}
          keyX="tempo"
          legendX="Tempo (meses)"
          legendY="Valor (R$)"
          dataKeyA="valorSemAporte"
          legendA="Sem Aporte"
          colorA="#151b1e"
          dataKeyB="valorComAporte"
          legendB="Com Aporte"
          colorB="#ed8e53"
        />
      );

      simulacaoRef.current.scrollIntoView({ behavior: "smooth" });
    });
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

  const handleSubmit = (data) => {
    handleSimulacao(data.rendimento, data.indexacao);
  };

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

  return (
    <Box className="container">
      <FlexColumn>
        <Title data-tip="React-tooltip">Simulador</Title>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={simulacaoSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <Form id="formSimulacao">
                <Box>
                  <FlexColumn>
                    <div>
                      <p className="labelInfo">
                        Rendimento
                        <MdInfoOutline size="1.2em" />
                        <span>Escolha uma das op????es de rendimento.</span>
                      </p>

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
                          <label htmlFor="liquido">L??quido</label>
                        </RadioInput>
                      </GroupInput>

                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error"
                      />
                    </div>

                    <FieldInput
                      error={errors.aporte_inicial}
                      touched={touched.aporte_inicial}
                      label="Aporte Inicial"
                      name="aporte_inicial"
                      className="money"
                      placeholder="R$"
                    />

                    <FieldInput
                      error={errors.prazo}
                      touched={touched.prazo}
                      label="Prazo"
                      name="prazo"
                    />

                    <FieldInput
                      error={errors.ipca}
                      touched={touched.ipca}
                      label="IPCA (ao ano)"
                      name="ipca"
                      className="percent"
                      placeholder="%"
                      readOnly
                    />
                  </FlexColumn>

                  <FlexColumn>
                    <div>
                      <p className="labelInfo">
                        Tipos de indexa????o <MdInfoOutline size="1.2em" />
                        <span>Escolha uma das op????es de indexa????o.</span>
                      </p>

                      <GroupInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="indexacao"
                            id="pre"
                            value="pre"
                          />
                          <label htmlFor="pre">PR??</label>
                        </RadioInput>
                        <RadioInput>
                          <Field
                            type="radio"
                            name="indexacao"
                            id="pos"
                            value="pos"
                          />
                          <label htmlFor="pos">P??S</label>
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

                    <FieldInput
                      error={errors.aporte_mensal}
                      touched={touched.aporte_mensal}
                      label="Aporte Mensal"
                      name="aporte_mensal"
                      className="money"
                      placeholder="R$"
                    />

                    <FieldInput
                      error={errors.rentabilidade}
                      touched={touched.rentabilidade}
                      label="Rentabilidade"
                      name="rentabilidade"
                      className="percent"
                      placeholder="%"
                    />

                    <FieldInput
                      error={errors.cdi}
                      touched={touched.cdi}
                      label="CDI (ao ano)"
                      name="cdi"
                      className="percent"
                      readOnly
                      placeholder="%"
                    />
                  </FlexColumn>
                </Box>

                <Box className="groupButtons">
                  <Button type="reset" onClick={() => setChart(null)}>
                    Limpar campos
                  </Button>

                  <Button
                    type="submit"
                    className={!(dirty && isValid) && "disabled-btn"}
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

      <FlexColumn ref={simulacaoRef}>
        {chart && (
          <>
            <h2>Resultado da Simula????o</h2>
            <CardList simulacao={simulacao} />

            <h3>Proje????o de Valores</h3>
            {chart}
          </>
        )}
      </FlexColumn>
    </Box>
  );
};

export default Simulador;
