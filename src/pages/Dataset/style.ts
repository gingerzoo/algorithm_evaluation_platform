import styled from "styled-components";

export const DatasetWrap = styled.div`
  background-color: white;
  padding: 15px 15px 50px 25px;

  .dataset-body {
    .mytable {
      display: inline-block;
      position: relative;
    }
    table {
      margin: 15px 0;
      th,
      td {
        padding: 10px 25px;
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
      position: absolute;
      right: 0;
      /* display: inline-block; */
      padding: 10px 20px;
      border-radius: 10px;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
`;
