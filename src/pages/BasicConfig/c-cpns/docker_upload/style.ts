import styled from "styled-components";

export const UploadWrap = styled.div`
  text-align: center;
  .big-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 290px;
    /* height: 142px; */
    padding-bottom: 25px;

    background-color: #e6f3ff;
    border: 2px dashed #0077fa;
    border-radius: 8px;
    & > * {
      margin-top: 20px;
    }
    &:hover {
      cursor: pointer;
    }
    .file-type {
      color: #6d747b;
      font-size: 14px;
    }

    .dataset-type {
      color: white;
      font-size: 14px;
      background-color: rgba(72, 125, 184, 1);

      padding: 3px 5px;
      margin: 0 6px;
      &:hover {
        transform: scale(1.1);
      }
      &.selected {
        color: rgb(22, 119, 255);
        background-color: plum;
      }
    }

    .docker {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      background-color: pink;
      border: none;
      /* filter: alpha(opacity=0); */
      opacity: 0;
    }
  }

  .command {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;

    background-color: #1890ff;
    &:hover {
      cursor: pointer;
      background-color: #447ed9;
    }
  }
`;
