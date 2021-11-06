import styled from "styled-components";

export const CenterDivAbs = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const CardContainer = styled.div`
  cursor: pointer;
  transition: 1s fade-ease-in-out;

  &:hover {
    border: 2px solid #10b981 !important;
    opacity: 0.7;
  }
`;
