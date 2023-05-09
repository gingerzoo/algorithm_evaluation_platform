import styled from "styled-components";

export const PictureWrap = styled.div`
  position: relative;
  .slider {
    width: 100%;
    height: calc(100vh - 150px);
    background-color: #364d79;
    .ant-carousel {
      .pic {
        height: calc(100vh - 150px);
        overflow: hidden;
      }
      img {
        width: 100%;
        /* height: 100%; */
        object-fit: cover;
        /* object-position: center center; */
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
