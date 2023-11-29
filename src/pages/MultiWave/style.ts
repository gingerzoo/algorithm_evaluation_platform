import styled from "styled-components";

export const MultiWrap = styled.div`
  padding: 0 4vw;

  .prepare td {
    .text {
      margin: 0 20px;
    }
    .start {
      height: auto;
      font-size: 20px;
      /* padding: 4px 20px; */
      margin: 0 15px;
      color: white;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
  .reliable {
    margin-top: 30px;
    td.score {
      background-color: ${(props) => props.theme.color.greenColor};
    }
  }

  .top {
    .pic {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
      background-color: #fff;
      gap: 40px; /* 调整图片之间的间距 */
      
      .picture {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        img {
          width: 100%;
          border-radius: 5px;
          max-width: 300px; /* 图片的最大宽度，根据需要调整 */
        }
        
        p {
          margin-top:10px;
          text-align: center;
        }
      }
    }

    }

    .describe {
      /* padding: 1vw 4vw; */
      text-indent: 2em;
      font-family: "SimSun";
      line-height: 22px;
      text-align: justify;
      margin-bottom: 0.8vw;
    }
  }

  .exec {
    display: flex;
    align-items: center;
  }
  button.btn {
    margin-right: 3vw;
    padding: 1vw 2vw;
    font-weight: 700;
    ${(props) => props.theme.mixin.btnHover}
  }
`;
