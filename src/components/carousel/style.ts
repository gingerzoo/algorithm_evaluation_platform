import styled from "styled-components";

interface Ivoice {
  isVoice: boolean;
}

export const MyCarouselWrap = styled.div<Ivoice>`
  .switch-pic {
    margin-bottom: 20px;
    .slider-control .anticon {
      font-size: 20px;
      /* color: white; */
      border: solid 1px blue;
    }
    .left-btn {
      margin-right: 5px;
    }
  }

  .ant-drawer.ant-drawer-right > .ant-drawer-content-wrapper {
    bottom: auto;
  }

  img {
    width: 35vw;
  }
  /* .slick-slide{

  } */
  audio {
    width: 28vw;
    margin: 0 auto;
  }
`;
