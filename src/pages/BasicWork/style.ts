import styled from "styled-components";

export const WorkWrap = styled.div`
  .next {
    display: flex;
    justify-content: flex-end;
    padding-right: 1.5vw;
    margin-top: 1.5vw;

    span {
      padding: 1vw 1.6vw;
      border-radius: 8px;
      /* background-color: #79cc86; */
      background-color: #1890ff;
      color: white;
    }
    &:hover span {
      cursor: pointer;
      background-color: #447ed9;
    }
  }
`;
