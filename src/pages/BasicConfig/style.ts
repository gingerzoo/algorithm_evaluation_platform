import styled from "styled-components";

interface Iprops {
  isSystem: boolean;
  isPicture: boolean;
  run_status: number;
  //   isPending: boolean;
}

export const ConfigWrap = styled.div<Iprops>`
  /* position: relative; */

  padding: 0 6vw;

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
      background-color: white;
      border: 1px solid ${(props) => props.theme.color.forthColor};
      box-shadow: 0 0 4px ${(props) => props.theme.color.secondColor};
      /* opacity: 0.8; */
    }
    .ant-menu {
      border-bottom: none;
      background-color: ${(props) => props.theme.textColor.secondColor};
    }
    .ant-menu-item {
      border: 1px solid ${(props) => props.theme.color.forthColor};
      box-shadow: 0 0 3px ${(props) => props.theme.color.secondColor};
      /* border-bottom: none; */
      border-radius: 4px;
      background-color: white;
      margin-left: 10px;

      padding: 0 2.4vw;
    }
    .ant-menu-horizontal .ant-menu-item-selected {
      background-color: ${(props) => props.theme.color.orangeColor};
      border: none;
      color: white;
    }
  }
  button.btn {
    height: 3.8vw;
    line-height: 3.8vw;
    margin-right: 4.8vw;
    padding: 0 2.2vw;
    ${(props) => props.theme.mixin.btnHover}
  }

  .oper {
    display: flex;
    padding-top: 0.5vw;
    .spinning {
      /* display: ${(props) => (props.run_status == 0 ? "block" : "none")}; */
      height: 3.8vw;
      margin: 0 4vw 0 -2.7vw;
      line-height: 4.3vw;
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
