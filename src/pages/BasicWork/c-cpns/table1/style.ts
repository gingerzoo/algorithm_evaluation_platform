import styled from "styled-components";

interface Iprops {
  result: number;
}

export const TableWrap = styled.div<Iprops>`
  table {
    /* width: 100%; */

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
    width: 62.5vw;
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
