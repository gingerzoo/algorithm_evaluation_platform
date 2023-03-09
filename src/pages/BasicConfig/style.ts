import styled from "styled-components";

interface Iprops {
  isSystem: boolean;
  isPicture: boolean;
}

export const ConfigWrap = styled.div<Iprops>`
  /* position: relative; */
  margin: 0 140px;

  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .confi {
    margin-top: 30px;

    .ant-input,
    .ant-menu {
      height: 38px;
      line-height: 38px;
      width: 600px;
      /* margin: 0 15px; */
    }
    .ant-input {
      border-radius: 0;
    }
    .ant-menu {
      border-bottom: none;
    }
    .ant-menu-item {
      border: 1px solid #d9d9d9;
      padding: 0 30px;
    }
    .ant-menu-horizontal .ant-menu-item-selected {
      background-color: plum;
    }
  }

  .oper {
    display: flex;
    .btn {
      height: 50px;
      line-height: 50px;
      border-radius: 8px;
      margin-right: 60px;
      padding: 0 30px;
      background-color: #1890ff;
      color: white;
      &:hover {
        cursor: pointer;
        background-color: #447ed9;
      }
    }
    .next {
      background-color: #79cb85;
      &:hover {
        background-color: #97c8a8;
      }
    }
  }

  .system {
    display: ${(props) => (props.isSystem ? "block" : "none")};
  }

  .picture {
    display: ${(props) => (props.isPicture ? "block" : "none")};
  }

  /*
  .message-success {
    background-color: green;
  }
  .message-failed {
    background-color: plum;
  } */
`;
