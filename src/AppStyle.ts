import styled from "styled-components";

interface Iprops {
  isGreen: boolean;
}

export const AppWrap = styled.div<Iprops>`
  border-color: #ffffff;
  /* height: 100vh; */
  /* 随意的测试 */
  .main {
    display: flex;
    min-height: calc(100vh - 8.7vw);
    position: relative;
    .green-hand {
      display: ${(props) => (props.isGreen ? "block" : "none")};
    }
  }

  .content {
    width: calc(100vw - 252px);
    min-width: 990px;
    margin: 40px 0;
  }
`;
