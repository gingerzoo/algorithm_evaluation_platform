import styled from "styled-components";

export const PictureWrap = styled.div`
  position: relative;
  .slider {
    width: 100%;
    height: calc(100vh - 130px);
    background-color: #364d79;
    .ant-carousel {
      img {
        height: 420px;
        object-fit: contain;
      }
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
        font-size: 60px;
        color: white;
      }
    }
    .left-btn {
      left: -70px;
    }
    .right-btn {
      right: -70px;
    }
  }
`;
