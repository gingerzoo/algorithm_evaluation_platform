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

      button {
        color: #fcca00;
        padding: 0.8vw 1.6vw;
        background-color: transparent;
        border: 1px solid white;
        border-radius: 4px;
        &:last-of-type {
          margin-left: 4vw;
        }
        &:hover {
          color: black;
          background-color: ${(props) => props.theme.color.greenColor};
        }
      }

      .top h1 {
        margin: 0;
        /* padding-left: 30px; */
        /* background: white url(${logo}) 0 0 / contain no-repeat; */
      }

      .top h5 {
        margin-top: 1.2vw;
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
      /* text-align: center; */
      h2 {
        position: relative;
        width: 100%;
        box-sizing: border-box;

        margin-bottom: 1.2vw;
        font-weight: 400;

        .icon {
          position: absolute;
          /* margin-right: 2px; */
          height: 24px;
          width: 24px;
          left: -30px;
          top: 0;
          bottom: 0;
          margin: auto;
        }

        .title {
          display: block;
          padding-bottom: 5px;
          border-bottom: 3px solid #0763ac;
        }
        /* text-align: left; */
      }

      &:nth-of-type(2n + 1) h2 {
        padding: 0 50px;
        .icon {
          left: 20px;
        }
      }

      img {
        width: 84%;
        object-fit: contain;
      }

      .box {
        box-sizing: border-box;
        margin-bottom: 20px;
        padding: 0 50px;
        p {
          font-size: 12px;
          line-height: 1.5;
          /* text-indent: 2em; */
          /* line-height: 16px; */
        }
      }
    }
  }
`;
