import styled from "styled-components";

export const AdaptWraper = styled.div`
  .operate {
    display: flex;
    justify-content: flex-end;
    /* padding-right: 1.5vw; */
    margin-top: 1.5vw;

    .btn {
      padding: 1vw 1.6vw;
      border-radius: 8px;
      background-color: #1890ff;
      color: white;
      &:hover {
        cursor: pointer;
        background-color: #447ed9;
      }
    }
  }
`;
