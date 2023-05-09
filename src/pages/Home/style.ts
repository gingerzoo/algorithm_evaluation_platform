import styled from "styled-components";
import bg from "@/assets/images/bg.jpg";

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
          background-color: #7bc55e;
        }
      }

      .top h1 {
        margin: 0;
      }

      .top h5 {
        margin-top: 1.2vw;
      }
    }
  }

  main {
    /* display: flex; */
    display: flex;
    padding: 20px 50px;
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
        margin-bottom: 20px;
        font-weight: 400;
      }

      img {
        width: 80%;
        object-fit: contain;
      }

      .box {
        box-sizing: border-box;
        margin-bottom: 30px;
        padding: 0 50px;
        p {
          font-size: 14px;
        }
      }
    }
  }
`;
