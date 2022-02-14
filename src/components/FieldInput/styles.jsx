import styled from "styled-components";

export const BoxField = styled.div`
  &.error {
    & > *:not(input) {
      color: red;
    }

    &:where(span) {
      display: block;
      margin-top: 5px;
    }

    & > *:where(input) {
      border-bottom-color: red !important;
    }
  }
`;
