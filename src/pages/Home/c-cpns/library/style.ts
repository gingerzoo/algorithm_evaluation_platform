import styled from "styled-components";

export const LibraryWrap = styled.div`
  .Navi {
    padding-bottom: 7px;
    span {
      display: inline-block;
      padding: 3px 5px;
      border-radius: 8px;
      font-size: 14px;
      /* font-weight: 700; */
      margin-right: 10px;
      cursor: pointer;
    }

    .light {
      color: white;
      background-color: #73c0de;
    }
  }

  h2 {
    position: relative;
    color: #666666;
    width: 100%;
    box-sizing: border-box;

    margin-bottom: 0.2vw;
    font-weight: 400;
    .icon {
      position: absolute;
      height: 1.9vw;
      width: 1.9vw;
      left: -2.38vw;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    .title {
      display: block;
      padding-bottom: 5px;
      border-bottom: 3px solid #0763ac;
    }
  }
`;
