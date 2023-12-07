import styled from "styled-components";

export const PictureWrap = styled.div`
  position: relative;
  .slider {
    width: 100%;
    height: calc(100vh - 11vw);
    background-color: #364d79;
    .pic {
      display: flex;
      height: calc(100vh - 11vw);
      align-items: center;
      overflow: hidden;
    }
    img {
      width: 100%;
      /* height: 100%; */
      object-fit: cover;
      /* object-position: center center; */
    }

    .slider-control {
      position: absolute;
      /* width: 30px;
      height: 30px; */
      /* height: 30px; */
      /* bottom: 0; */
      top: 50%;
      transform: translateY(-50%);
      background-color: transparent;
      z-index: 4;
      .anticon {
        font-size: 4.5vw;
        color: white;
      }
    }
    .left-btn {
      left: -5.5vw;
    }
    .right-btn {
      right: -5.5vw;
    }

    /* .data_info_all {
      padding: 10px;
    } */

    .data_coor {
      position: absolute;
      overflow-y: auto;
      color: black;

      width: 22vw;
      height: 100%;
      padding: 0.8vw;
      box-sizing: border-box;
      background: #eee;
      left: -28vw;
      top: 0;

      h3.pic_index {
        text-align: center;
        margin: 20px 0;
        font-size: 1.3vw;
      }

      .mar {
        margin: 10px 0;
      }

      h4 {
        font-size: 1.1vw;
      }

      .data_info {
        display: flex;
        flex-direction: column;
        font-size: 1vw;

        .coordinate {
          display: flex;
          align-items: center;

          a {
            margin-left: 5px;
          }
        }

        .set-coor {
          display: flex;
          justify-content: space-between;
          font-size: 0.7vw;
          input {
            display: inline-block;
            width: 15vw;
          }

          .sure {
            font-size: 0.8vw;
            padding: 0.5vw;
            ${(props) => props.theme.mixin.btnHover}
          }
        }
      }
    }
  }
`;
