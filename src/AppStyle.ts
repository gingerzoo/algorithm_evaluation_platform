import styled from "styled-components";

interface Iprops {
  isGreen: boolean;
}

export const AppWrap = styled.div<Iprops>`
  border-color: #ffffff;
  /* height: 100vh; */
  .main {
    display: flex;
    min-height: calc(100vh - 110px);
    position: relative;
    .green-hand {
      display: ${(props) => (props.isGreen ? "block" : "none")};
    }
  }

  .content {
    width: calc(100vw - 252px);
    margin: 40px 0;
  }
`;
