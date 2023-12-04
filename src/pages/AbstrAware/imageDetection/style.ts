import styled from "styled-components";

export const Detection = styled.div`
  padding: 0 6vw;
  .textStyle {
    font-size: 0 1.2vw;
  }
  button.btn {
    height: 2.4vw;
    line-height: 2.4vw;
    margin-right: 2.4vw;
    margin-top: 0.6vw;
    padding: 0 1.2vw;
    ${(props) => props.theme.mixin.btnHover}
  }
  /* 设置空的DIV容器的样式 */
  .empty-div {
    width: 1000px; /* 设置宽度 */
    height: 100px; /* 设置高度 */
  }

  table {
    min-width: 20vw;
    td {
      padding: 0.3vw 0.5vw;
    }

    .muti-target {
      background-color: #f2f2f2;
    }
  }
  .spinning {
    margin: 0 3vw 0 2vw;
  }
`;
