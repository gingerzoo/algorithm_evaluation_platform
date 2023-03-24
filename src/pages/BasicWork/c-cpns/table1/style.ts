import styled from "styled-components";

interface Iprops {
  result: number;
}

export const TableWrap = styled.div<Iprops>`
  table {
    /* width: 100%; */
    min-width: 70vw;

    .no-pad {
      padding: 0;
    }
    .row-header {
      width: 8.7vw;
    }
    .row-sub-header {
      width: 8vw;
    }
  }

  .largetable {
    margin: 0 auto;
  }

  .smalltable {
    max-width: 63vw;
    min-width: 62vw;
    /* border: none; */
    border-width: 0px;
    border-style: hidden;

    & > tbody > tr:nth-child(2n + 1) {
      background-color: white;
    }
    & > tbody > tr:nth-child(2n) {
      background-color: #f2f2f2;
    }

    .pass {
      background: #97c8a8;
    }
    .noPass {
      background: #ff6161;
    }

    .population {
      background-color: ${(props) => (props.result ? "#FF6161" : "#97C8A8")};
    }
  }
`;
