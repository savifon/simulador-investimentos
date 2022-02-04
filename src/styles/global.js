import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    color: #2e2e2e;
    transition: all ease .3s;
  }

  body {
    background-color: #e3e3e3;
  }

  button {
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;

    &:hover {
      opacity: .85;
    }
  }
`;
