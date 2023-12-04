import styled from "styled-components";

export const WorkWrap = styled.div`
  padding: 0 2vw;
  .btn {
    padding: 1vw 2vw;
    font-size: 1.1vw;
    font-weight: 700;
    ${(props) => props.theme.mixin.btnHover}
  }
  .next {
    display: flex;
    justify-content: flex-end;
    margin-top: 2vw;

    .ant-btn.btn {
      height: auto;
      font-size: 1.2vw;
    }
  }
  .top {
    display: flex;
    margin: 0.5vw 0;
    gap: 3vw;
    .btn {
      justify-content: space-around;
      margin-bottom: 1.5vw;
    }
    .spinning {
      height: 3.8vw;
      margin: 0 4vw 0 -2.7vw;
      line-height: 4.3vw;
    }
  }
  .describe {
    /* padding: 1vw 4vw; */
    text-indent: 2em;
    font-family: "SimSun";
    line-height: 22px;
    text-align: justify;
    margin-bottom: 0.8vw;
  }
`;
