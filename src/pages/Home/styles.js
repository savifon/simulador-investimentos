import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

export const Input = styled.input`
  border: none;
  background: none;

  &:not([type="radio"], [type="checkbox"]) {
    border-bottom: 1px solid #2e2e2e;
    padding: 10px 5px;
    width: 20vw;
    min-width: 200px;
    max-width: 100%;
    font-size: 1rem;
  }
`;

export const RadioInput = styled.div`
  position: relative;
  display: flex;
  max-width: fit-content;
  border: 1px solid #2e2e2e;
  overflow: hidden;

  &:hover {
    opacity: 0.85;
  }

  label {
    padding: 15px 20px;
    cursor: pointer;
  }

  input {
    position: absolute;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;

    & + label {
      background: #e9e9e9;
    }

    &:hover + label {
      background: #ed8e53c9;
      transition: all ease 0.2s;
    }

    &:checked + label {
      color: #ffffff;
      background: #ed8e53;

      &:before {
        content: " ";
        position: absolute;
        left: 2px;
        top: 50%;
        width: 3px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg) translateY(-100%);
      }
    }
  }
`;

export const GroupInput = styled.div`
  display: flex;

  & > *:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & > *:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #2e2e2e;
  background: #e9e9e9;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all ease 0.2s;

  &[type="submit"] {
    border: none;
    background: #ed8e53;
  }

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;
