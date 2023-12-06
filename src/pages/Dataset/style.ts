import styled from "styled-components";

export const DatasetWrap = styled.div`
  background-color: white;
  padding: 20px 30px 10px 30px;

  .dataset-body {
    .mytable {
      position: relative;
      display: flex;
      flex-direction: column;
    }
    table {
      margin: 15px 0;
      th,
      td {
        padding: 0.8vw 1.58vw;
        color: ${(props) => props.theme.textColor.primaryColor};
        font-weight: 400;
        font-size: 14px;
      }
      th {
        font-weight: 700;
      }
    }

    td.oper .divider {
      padding: 0 5px;
    }

    td.oper span:nth-child(odd) {
      color: ${(props) => props.theme.color.secondColor};
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.color.orangeColor};
      }
    }
    button {
      align-self: end;
      padding: 0.7vw 1.6vw;
      border-radius: 10px;
      font-size: 1.1vw;
      font-weight: 700;
      ${(props) => props.theme.mixin.btnHover}
      &.backToPrePage {
        align-self: stretch;
        margin-top: 1vw;
      }
    }
  }
`;
