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
  }
`;
