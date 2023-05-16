import styled from "styled-components";

export const AlgorWrap = styled.div`
  text-align: center;
  .big-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 24vw;
    height: 12vw;
    padding-bottom: 1.5vw;

    background-color: ${(props) => props.theme.color.thirdColor};
    border: 2px dashed ${(props) => props.theme.color.primaryColor};
    border-radius: 8px;
    & > * {
      margin-top: 20px;
    }

    .select {
      display: flex;
      /* align-items: center; */
      justify-content: space-between;

      .divider {
        width: 2px;
        height: 100%;
        background: ${(props) => props.theme.color.primaryColor};
        margin: 0 5px;
      }

      .docker-box .docker {
        display: none;
      }

      .docker-box button {
        height: 32px;

        line-height: 32px;

        box-sizing: border-box;
        background: #ffffff;
        color: rgba(0, 0, 0, 0.48);
        font-size: 14px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        padding-left: 11px;
        i {
          display: inline-block;
          width: 7vw;
          font-size: 12px;
          white-space: none;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          vertical-align: top;
          height: 100%;
          color: white;

          padding: 0 5px;
          margin-left: 7px;
          border-radius: 0 6px 6px 0;
          ${(props) => props.theme.mixin.btnHover};
        }
      }
    }
  }

  .command {
    display: inline-block;
    margin-top: 1.2vw;
    padding: 0.8vw 1.6vw;
    color: white;
    border-radius: 8px;

    ${(props) => props.theme.mixin.btnHover}

    .ant-select-selector {
      background-color: ${(props) => props.theme.color.greenColor};
    }
  }
`;
