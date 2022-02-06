import styled from "styled-components";

export const CardItem = styled.div`
  background: #e9e9e9;
  box-shadow: 0 0 10px #cccccc;
  border: 1px solid #cccccc;
  padding: 15px;
  text-align: center;
  border-radius: 3px;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > .green {
    font-weight: bold;
    color: #3ea02e;
  }
`;
