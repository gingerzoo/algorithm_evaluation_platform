import styled from "styled-components";

interface Iprops {
  isSystem: boolean;
  isPicture: boolean;
  run_status: number;
  //   isPending: boolean;
}

export const ConfigWrap = styled.div<Iprops>`
  /* position: relative; */
  margin: 0 6vw;

  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 0.8vw;
  }

  .confi {
    margin-top: 2vw;
    /* padding: 0 7vw; */

    .ant-input,
    .ant-menu {
      height: 3vw;
      line-height: 3vw;
      width: 50vw;
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
      padding: 0 2.4vw;
    }
    .ant-menu-horizontal .ant-menu-item-selected {
      background-color: ${(props) => props.theme.color.orangeColor};
      color: white;
    }
  }

  .oper {
    display: flex;
    padding-top: 0.5vw;
    .spinning {
      /* display: ${(props) => (props.run_status == 0 ? "block" : "none")}; */
      height: 3.8vw;
      /* margin: 0 30px; */
      margin: 0 4vw 0 -2.7vw;
      line-height: 4.3vw;
    }
    .btn {
      height: 3.8vw;
      line-height: 3.8vw;
      border-radius: 8px;
      margin-right: 4.8vw;
      padding: 0 2.2vw;
      color: white;
      ${(props) => props.theme.mixin.btnHover}
    }
    .next {
      background-color: ${(props) =>
        props.run_status == 0 ? props.theme.color.primaryColor : "#C8C8C8"};

      &:hover {
        background-color: ${(props) =>
          props.run_status == 0 ? props.theme.color.primaryColor : "#C8C8C8"};
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
