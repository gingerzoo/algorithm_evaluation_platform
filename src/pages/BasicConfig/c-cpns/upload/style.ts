import styled from "styled-components";

export const UploadWrap = styled.div`
  text-align: center;
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
      margin-top: 15px;
      font-size: 16px;
    }

    .select {
      height: 105px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;

      box-sizing: border-box;
      padding: 15px 40px;

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
      height: 30px;
      width: 100%;
      line-height: 30px;
      box-sizing: border-box;
      box-shadow: 0 0 3px rgba(40, 123, 140, 0.8);
      background: #ffffff;
      color: rgba(0, 0, 0, 0.48);
      font-size: 14px;
      overflow: hidden;
      /* border: 1px solid #d9d9d9; */
      border-radius: 6px;

      i {
        flex: 1;
        padding: 0 15px;
        font-size: 12px;
        white-space: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        ${(props) => props.theme.mixin.btnHover};
        padding: 0 5px;
        border-radius: 0 6px 6px 0;
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
        padding: 6px;
        color: white;
        font-size: 12px;

        background-color: ${(props) => props.theme.color.secondColor};
        border-radius: 3px;
        box-shadow: 0 0 4px ${(props) => props.theme.color.secondColor};
        &:hover {
          transform: scale(1.1);
        }
        &.selected {
          color: white;
          background-color: ${(props) => props.theme.color.orangeColor};
          box-shadow: 0 0 4px ${(props) => props.theme.color.orangeColor};
        }
      }
    }
  }

  .command {
    display: inline-block;
    margin-top: 1.2vw;
    padding: 0.8vw 1.6vw;
    color: white;

    ${(props) => props.theme.mixin.btnHover}

    .ant-select-selector {
      background-color: ${(props) => props.theme.color.greenColor};
    }
  }
`;
