import styled from "styled-components";

export const ProcessWrap = styled.div`
  display: flex;
  align-items: center;
  height: 4vw;
  color: white;

  /* text-align: center; */
  padding-left: 5px;
  background-color: ${(props) => props.theme.color.secondColor};

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

  .left {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-right: 2.4vw;
  }
`;
