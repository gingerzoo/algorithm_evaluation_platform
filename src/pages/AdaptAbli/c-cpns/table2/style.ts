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

    padding: 0.7vw 8vw;
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
        text-align: left;
        background-color: ${(props) => props.theme.color.forthColor};
        padding: 12px 20px;
        div {
          color: #777;

          display: -webkit-box;
          -webkit-box-orient: vertical; /* 垂直方向 */
          -webkit-line-clamp: 2; /* 显示两行 */
          overflow: hidden; /* 溢出部分隐藏 */
          text-align: justify; /* 两端对齐 */
          line-height: 1.5em; /* 行高 */
          /* &:hover {
            -webkit-line-clamp: unset;
            white-space: normal;
            cursor: pointer;
          } */
        }
      }
      a.showPic {
        font-weight: 400;
        cursor: pointer;
        text-decoration: underline;
      }

      &.adaptRes span {
        font-size: 18px;
        font-weight: 700;
        color: teal;
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
        /* button.ant-btn {
          padding: 0;
          height: 3.6vw;
        } */
      }
    }
  }
`;
