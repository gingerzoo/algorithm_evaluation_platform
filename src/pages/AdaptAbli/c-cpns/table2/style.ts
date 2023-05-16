import styled from "styled-components";
export const Table2Wrapper = styled.div`
  .ant-btn-primary {
    background-color: #eeeeee;
    border: 1px dashed #666666;
    color: #666666;
  }

  .newCondi {
    ${(props) => props.theme.mixin.btnHover}
    border: none;

    padding: 0 4vw;
    font-size: 1.3vw;
    color: white;
  }
  table {
    /* width: 900px; */

    min-width: 70vw;
    td {
      .weight {
        margin: 0 1.2vw 0 1vw;
      }
      .intensity {
        display: inline-block;
        width: 3vw;
      }
      &.evaluation {
        background-color: ${(props) => props.theme.color.greenColor};
      }

      .preWork {
        display: flex;
        justify-content: center;
        .title {
          position: relative;
          span.ant-checkbox {
            position: absolute;
            right: -15px;
            top: -7px;
            span.ant-checkbox-inner {
              height: 15px;
              width: 15px;
            }
          }
        }

        /* justify-content: center; */
        /* margin: 0 0.5vw; */
        /* margin-right: 0.5vw; */
        /* span {
          padding: 0 0.3vw 0 0.2vw;
        } */
      }

      .viewPic {
        margin-top: 0.4vw;
      }

      &.add-work {
        line-height: 2.9vw;
      }
      .box-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 1vw;
        .viewPic {
          margin-top: 0.5vw;
        }
        button.ant-btn {
          padding: 0;
        }
      }
    }
  }
`;
