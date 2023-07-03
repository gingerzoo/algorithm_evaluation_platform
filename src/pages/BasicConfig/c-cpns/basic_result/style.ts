import styled from "styled-components";

export const BasicResWrap = styled.div`
  /* padding: 20px 5px; */
  margin: 20px 0;
  .result .content {
    display: flex;
    width: 100%;
    padding: 20px 0px 20px 10px;
    background-color: ${(props) => props.theme.color.thirdColor};
    .result_item {
      display: flex;

      /* margin: 5px 0; */
      align-items: center;
      flex-direction: space-between;
      .name {
        width: 120px;

        text-align: right;

        color: ${(props) => props.theme.textColor.primaryColor};
        margin-right: 10px;
      }
    }
    .left {
      flex: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      /* .ant-progress .ant-progress-inner {
        width: 100px;
        height: 100px;
      } */
    }
  }
  div.next {
    margin-top: 20px;
  }
  .result .header {
    text-align: center;
    margin-bottom: 10px;
  }
`;
