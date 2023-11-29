import styled from "styled-components";
import bg from "@/assets/images/bg.jpg";
import logo from "@/assets/images/logo2.jpg";

export const HomeWrapper = styled.div`
  header {
    width: 100%;
    height: 16vw;
    text-align: center;
    color: white;
    background: url(${bg}) no-repeat center/cover;
    .center {
      display: flex;
      height: 100%;
      box-sizing: border-box;
      padding: 2.1vw 0 2.8vw 0;

      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      a {
        display: inline-block;
        text-decoration: none;
        font-size: 100%;
        &:last-of-type {
          margin-left: 4vw;
        }
      }

      button,
      a {
        color: #fcca00;
        padding: 0.8vw 1.6vw;
        background-color: transparent;
        border: 1px solid white;
        border-radius: 4px;

        &:hover {
          color: black;
          background-color: ${(props) => props.theme.color.greenColor};
        }
      }

      .top {
        h5.desc {
          margin-top: 1.2vw;
          font-size: 1vw;
        }

        h1.page-name {
          margin: 0;
          font-size: 2.4vw;
          /* padding-left: 30px; */
          /* background: white url(${logo}) 0 0 / contain no-repeat; */
        }
      }

      .opeBar {
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
        font-size: 1.2vw;
      }
    }
  }

  main {
    /* display: flex; */
    display: flex;
    min-height: calc(100vh - 16vw);
    padding: 2.4vw 4vw;
    background-color: #f5f5f5;
    /* box-sizing: border-box; */

    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;

      h2 {
        position: relative;
        color: #666666;
        width: 100%;
        box-sizing: border-box;

        margin-bottom: 1.2vw;
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
          font-size: 1.6vw;
          padding-bottom: 5px;
          border-bottom: 3px solid #0763ac;
        }
        /* text-align: left; */
      }

      &:nth-of-type(2n + 1) h2 {
        padding: 0 3.95vw;
        .icon {
          left: 1.58vw;
        }
      }

      img {
        width: 80%;
        object-fit: contain;
      }

      .box {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
        padding: 0 3.95vw;
        p {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.9);
          /* text-indent: 2em; */
          /* line-height: 16px; */
        }
      }
    }
  }
`;
