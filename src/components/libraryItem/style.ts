import styled from "styled-components";

export const LibraryItemWrap = styled.div`
  height: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;

  color: black;
  border: 2px solid #0763ac;
  border-radius: 4px;
  overflow: hidden;

  &:nth-child(n + 2) {
    margin-top: 8px;
  }

  .title {
    display: flex;
    padding: 5px;
    margin-bottom: 6px;

    a {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }

  .pub_info {
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
    /* .time {
      float: right;
      text-align: right;
    } */
  }
`;
