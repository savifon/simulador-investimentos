import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    color: #151b1e;
  }

  body {
    background-color: #e3e3e3;
  }
`;
