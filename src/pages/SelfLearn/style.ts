import styled from "styled-components";

export const SelfLearnWrap = styled.div`
  table {
    min-width: 60vw;
    .describe {
      max-width: 47.5vw;
      padding: 0.8vw 1.5vw;
    }
  }
  table tbody tr:nth-child(2n + 1) {
    background-color: #f2f2f2;
  }
`;
