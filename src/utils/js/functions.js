export const regexFloat =
  /^([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)(,[0-9][0-9])?$/g;
export const regexInteger = /^[0-9]*$/;

export const brl = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
