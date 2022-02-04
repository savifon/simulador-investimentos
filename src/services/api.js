import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getIndicadores = async () => {
  return api.get("/indicadores");
};

export const getSimulacao = async (rendimento, indexacao) => {
  return api.get("/simulacoes", {
    params: {
      tipoRendimento: rendimento,
      tipoIndexacao: indexacao,
    },
  });
};
