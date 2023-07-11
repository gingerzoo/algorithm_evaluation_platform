import styled from "styled-components";

export const TrustWrap = styled.div`
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
      img {
        width: 100%;
        object-fit: cover;
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
    height: 3.8vw;
    line-height: 3.8vw;
    margin-right: 3vw;
    padding: 0 2.2vw;
    ${(props) => props.theme.mixin.btnHover}
  }
`;
