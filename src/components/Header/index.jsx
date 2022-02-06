import React from "react";

import { Container } from "./styles";

const Header = (props) => {
  const { title } = props;

  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
};

export default Header;
