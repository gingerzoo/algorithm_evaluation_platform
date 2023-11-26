import styled from "styled-components";
export const NoiseModelWrapper = styled.div`
  display: flex;
  justify-content: center;
  table {
    font-size: 1.2vw;
    width: 70vw;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    text-align: center;
    border: 2px solid rgba(0, 128, 128, 0.2);
    /* min-width: 70vw; */
  }

  table tr th {
    padding: 0.5vw;
    margin: 0 1.2vw 0 1vw;
    border: 1px solid rgba(0, 128, 128, 0.2);
  }

  table tr td {
    padding: 0.5vw 0.5vw;
    margin: 0 1.2vw 0 1vw;
    border: 1px solid rgba(0, 128, 128, 0.2);

    /* &.para {
      padding: 0.5vw 1vw;
    } */
  }

  input {
    margin: 5px 0;
    border: 1px solid #ccc; /* 设置边框样式 */
    padding: 8px 15px; /* 设置内边距 */
    border-radius: 10px; /* 设置边框圆角 */
    font-size: 14px; /* 设置字体大小 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    background-color: ${(props) => props.theme.color.thirdColor};
  }

  span {
    margin-left: 0.5vw;
    &.para-range {
      font-size: 12px;
    }
  }

  .log {
    font-size: 1.12vw;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
  }
`;
