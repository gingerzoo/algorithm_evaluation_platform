import styled from "styled-components";

interface Iprops {
  isGreen: boolean;
}

export const ProfileWrap = styled.div<Iprops>`
  border-color: #ffffff;
  /* height: 100vh; */
  /* 随意的测试 */
  .main {
    display: flex;
    min-height: calc(100vh - 8.8vw);
    position: relative;
    .green-hand {
      display: ${(props) => (props.isGreen ? "block" : "none")};
    }
  }

  .content {
    /* position: relative; */
    width: calc(80vw - 2px);
    /* min-width: 990px; */
    /* min-width: 900px; */
    padding: 3.2vw;
    background-color: ${(props) => props.theme.textColor.secondColor};
  }
`;
