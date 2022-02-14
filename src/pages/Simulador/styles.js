import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  gap: 50px;

  &.container {
    padding: 30px 60px;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  & div {
    position: relative;
  }

  & label {
    display: block;
  }

  & input {
    border: none;
    background: none;

    &:not([type="radio"], [type="checkbox"]) {
      border-bottom: 1px solid #151b1e;
      padding: 10px 5px;
      width: 19vw;
      min-width: 200px;
      max-width: 100%;
      font-size: 1rem;

      & + span.placeholder {
        position: absolute;
        width: 25px;
        height: 40px;
        padding: 10px 0;
        left: 0;
        content: "R$";
      }

      &.percent + span.placeholder {
        left: unset;
        right: 0;
      }

      &.money {
        padding-left: 25px;
      }

      &[readOnly] {
        cursor: default;
      }
    }

    @media (max-width: 1200px) {
      width: 100% !important;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 60px;

    &.container {
      padding: 30px;
      gap: 60px;
    }

    &.groupButtons {
      flex-direction: column-reverse;
      gap: 20px;
    }
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  & p {
    margin-bottom: 10px;

    &.labelInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > span {
        display: none;
      }

      & svg:hover ~ span {
        display: block;
        position: absolute;
        right: 25px;
        top: 0;
        background: #151b1e;
        color: #ffffff;
        padding: 10px;
        border-radius: 3px;
        z-index: 999;
        width: 250px;
      }
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const Title = styled.h2`
  text-align: left;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

export const RadioInput = styled.div`
  position: relative;
  display: flex;
  max-width: fit-content;
  border: 1px solid #151b1e;
  overflow: hidden;

  &:hover {
    opacity: 0.85;
  }

  input {
    position: absolute;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;

    & + label {
      background: #e9e9e9;
      padding: 15px 20px;
      cursor: pointer;
    }

    &:hover + label {
      background: #ed8e53c9;
      transition: all ease 0.2s;
    }

    &:checked + label {
      color: #ffffff;
      background: #ed8e53;
      padding-left: 30px;

      &:before {
        content: " ";
        position: absolute;
        left: 13px;
        top: 50%;
        width: 3px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg) translateY(-100%);
      }
    }

    @media (max-width: 1200px) {
      & + label {
        padding: 12px 10px;
      }

      &:checked + label {
        padding-left: 15px;

        &:before {
          width: 2px;
          height: 6px;
          left: 0px;
        }
      }
    }
  }
`;

export const GroupInput = styled.div`
  display: flex;

  & > * {
    border-left-width: 0;
  }

  & > *:first-child {
    border-left-width: 1px;
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
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #151b1e;
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
    background: #969696;
    cursor: not-allowed;
  }
`;
