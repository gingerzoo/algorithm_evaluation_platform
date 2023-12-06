import styled from "styled-components";

interface IBrowswer {
  notBrowser: boolean;
  isVoice: boolean;
}
export const UploadWrap = styled.div<IBrowswer>`
  text-align: center;
  margin-bottom: 0.8vw;
  font-size: 1vw;
  color: ${(props) => props.theme.textColor.thirdColor};
  .big-box {
    position: relative;
    display: flex;
    width: 24vw;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.color.thirdColor};
    border: 2px dashed ${(props) => props.theme.color.primaryColor};
    border-radius: 15px;

    .icon,
    p.title {
      margin-top: 1.2vw;
      font-size: 1.1vw;
    }

    .select {
      height: 8vw;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;

      box-sizing: border-box;
      padding: 15px 40px;
      margin: 0.8vw 0;

      /* .docker-box {
        margin-bottom: 5px;
      } */

      .docker {
        display: none;
      }

      .select-box {
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 0 3px rgba(40, 123, 140, 0.8);

        /* .ant-select-single.ant-select-show-arrow
          .ant-select-selection-item
          .selectItem {
          display: flex;
          justify-content: space-between;
        } */

        .ant-select .ant-select-selector {
          height: 2.4vw;

          vertical-align: center;
          .ant-select-selection-placeholder {
            line-height: 2.4vw;
          }
        }

        .ant-select-single
          .ant-select-selector
          .ant-select-selection-item
          .optionItem-name {
          line-height: 2.4vw;
        }

        .ant-select-dropdown
          .ant-select-item
          .ant-select-item-option
          .ant-select-item-option-content
          .my-selectedItem {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .file-type {
      color: #6d747b;
      font-size: 14px;
    }

    button.false-input {
      display: flex;
      justify-content: space-between;
      height: 2.4vw;
      width: 100%;
      line-height: 2.4vw;
      box-sizing: border-box;
      box-shadow: 0 0 3px rgba(40, 123, 140, 0.8);
      background: #ffffff;
      color: rgba(0, 0, 0, 0.48);

      overflow: hidden;
      /* border: 1px solid #d9d9d9; */
      border-radius: 6px;

      i {
        flex: 1;
        padding: 0 15px;
        font-size: 0.8vw;
        white-space: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        ${(props) => props.theme.mixin.btnHover};
        padding: 0 0.5vw;
        border-radius: 0 6px 6px 0;
        font-size: 0.9vw;
      }
    }

    .upload-data {
      .docker {
        display: none;
      }
    }

    .select .default-data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button.dataset-type {
        height: 2.4vw;
        padding: 0 0.85vw;
        color: white;
        font-size: 0.8vw;
        background-color: ${(props) => props.theme.color.secondColor};
        border-radius: 3px;
        box-shadow: 0 0 4px ${(props) => props.theme.color.secondColor};
        background-color: ${(props) =>
          props.notBrowser ? "#b8b8b8" : props.theme.color.primaryColor};

        &:hover {
          background-color: ${(props) =>
            props.isVoice ? "#b8b8b8" : props.theme.color.primaryColor};
        }
        &.selected {
          color: white;
          background-color: ${(props) =>
            props.notBrowser ? "#b8b8b8" : props.theme.color.orangeColor};
          box-shadow: 0 0 4px
            ${(props) =>
              props.notBrowser ? "#b8b8b8" : props.theme.color.orangeColor};
        }
      }
    }
  }

  .command {
    display: inline-block;
    margin-top: 1.2vw;
    padding: 0.8vw 1.6vw 0.7vw 1.6vw;
    color: white;
    font-size: 1vw;
    /* ${(props) => props.theme.mixin.btnHover} */
    background-color: ${(props) =>
      props.notBrowser ? "#b8b8b8" : props.theme.color.primaryColor};

    &:hover {
      background-color: ${(props) =>
        props.notBrowser ? "#b8b8b8" : props.theme.color.primaryColor};
    }
  }
`;
