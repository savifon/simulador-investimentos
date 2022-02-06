import React from "react";

import { CardItem } from "./styles";

const Card = (props) => {
  const { title, text, bold } = props;

  return (
    <CardItem>
      <h3>{title}</h3>
      <p className={bold ? "green" : ""}>{text}</p>
    </CardItem>
  );
};

export default Card;
