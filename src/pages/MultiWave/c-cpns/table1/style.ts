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
    .show_basicResult {
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.color.orangeColor};
        color: white;
      }
    }
    .pass {
      background: ${(props) => props.theme.color.greenColor};
    }
    .noPass {
      background: ${(props) => props.theme.color.orangeColor};
    }
    .population {
      background-color: ${(props) =>
        props.result ? props.theme.color.orangeColor : "#97C8A8"};
    }
  }
`;
