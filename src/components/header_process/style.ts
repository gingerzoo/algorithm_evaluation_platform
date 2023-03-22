import styled from "styled-components";

export const ProcessWrap = styled.div`
  display: flex;
  align-items: center;
  height: 4vw;
  color: white;

  /* text-align: center; */
  padding-left: 5px;
  background-color: #447ed9;

  .title {
    box-sizing: border-box;
    width: 18vw;
    /* font-size: 18px; */
    padding: 0 1vw;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .process {
    .anticon {
      margin: 0 0.8vw;
    }
  }
`;
