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
    .attack_methods {
      height: 17vw;
      overflow-y: auto;
      margin-bottom: 20px;
    }
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
      margin-bottom: 1vw;
      span {
        display: block;
      }
    }
  }

  .exec {
    /* display: flex;
    justify-content: ; */
    margin-top: 1vw;
    button.btn {
      /* margin-right: 4vw; */
      padding: 1vw 3vw;
      font-weight: 700;
      font-size: 1.2vw;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
`;
