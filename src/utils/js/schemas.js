import * as Yup from "yup";

import { regexInteger, regexFloat } from "./functions";

export const simulacaoSchema = Yup.object().shape({
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
