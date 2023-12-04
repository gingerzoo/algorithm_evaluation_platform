import styled from "styled-components";

export const ProcessWrap = styled.div`
  position: fixed;
  top: 4.8vw;
  left: 0;
  right: 0;
  height: 4vw;
  z-index: 9;

  display: flex;
  align-items: center;

  color: white;
  /* margin-top: 4.8vw; */

  /* text-align: center; */
  padding-left: 5px;
  background-color: ${(props) => props.theme.color.secondColor};

  .title {
    box-sizing: border-box;
    width: 18vw;
    font-size: 1.4vw;
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

  .process-item {
    font-size: 1.15vw;
  }
`;
