import styled from "styled-components";

export const WorkWrap = styled.div`
  .next {
    display: flex;
    justify-content: flex-end;
    padding-right: 1.5vw;
    margin-top: 1.5vw;

    .ant-btn.btn {
      /* padding: 1vw 1.6vw;
      border-radius: 8px; */
      /* background-color: #79cc86; */
      /* background-color: #1890ff;
      color: white; */
      padding: 0.6vw 1.6vw;
      height: auto;
      font-size: 1.3vw;
      /* background-color: ${(props) => props.theme.color.secondColor};
      &:hover {
        background-color: ${(props) => props.theme.color.primaryColor};
      } */
      ${(props) => props.theme.mixin.btnHover}
    }
    button.btn {
      height: 3.8vw;
      line-height: 3.8vw;
      margin-right: 4.8vw;
      padding: 0 2.2vw;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
  .top {
    display: flex;
    padding-top: 0.5vw;
    .btn {
      justify-content: space-around;
      margin-bottom: 1.5vw;
    }
    .spinning {
      height: 3.8vw;
      margin: 0 4vw 0 -2.7vw;
      line-height: 4.3vw;
    }
    button.btn {
      height: 3.8vw;
      line-height: 3.8vw;
      margin-right: 4.8vw;
      padding: 0 2.2vw;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
`;
