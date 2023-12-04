import styled from "styled-components";

export const ResultsWrap = styled.div`
  section {
    background-color: ${(props) => props.theme.color.thirdColor};
    padding: 2.5vw 3.2vw;
    /* padding-top:2.5vw */
    margin-bottom: 1.6vw;
    h3 {
      margin-bottom: 2.4vw;
    }
    &:nth-of-type(1) {
      /* padding-bottom: 2vw; */
      h3 {
        text-align: center;
      }

      p {
        /* padding: 0 200px; */
        display: grid;

        grid-template-columns: 1fr 1fr 2fr;
        grid-template-rows: repeat(3, 4vw);
        /* grid-auto-rows: ; */
        /* justify-cotent */

        align-items: center;

        grid-template-areas:
          "item1 item4 pic "
          "item2 item5 pic"
          "item3 . pic ";
        grid-row-gap: 20px;
        grid-column-gap: 10px;
        .grid_item {
          display: flex;
          flex-direction: column;
          color: #8c909f;
          font-size: 14px;
          font-weight: 700;
          /* & span:nth-of-type(1) {
            font-size: 18px;
            color: black;
          } */
          & span:nth-of-type(2) {
            font-size: 16px;
            font-weight: 400;
            color: black;
          }
        }
      }

      .item1 {
        grid-area: item1;
      }
      .item2 {
        grid-area: item2;
      }
      .item3 {
        grid-area: item3;
      }
      .item4 {
        grid-area: item4;
      }
      .item5 {
        grid-area: item5;
      }
      /* .item6 {
        grid-area: item6;
      } */
      .pic {
        grid-area: pic;
        overflow: hidden;
        justify-self: center;
        img {
          width: 60%;
          object-fit: cover;
        }
      }
    }
    &:nth-of-type(2) {
      display: flex;
      justify-content: space-between;

      background-color: rgba(186, 186, 186, 0.1);

      h3 {
        margin-bottom: 2.3vw;
      }

      .left,
      .right {
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: left;
      }

      .left {
        .radar {
          width: 100%;
        }
      }

      .right .score_content {
        /* height: 27vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between; */
      }
    }

    &:nth-of-type(3) {
      position: relative;
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1.6vw;
      grid-template-areas:
        "chart1 chart2 "
        "chart3 chart4"
        "chart5 chart6";

      .chart1 {
        grid-area: chart1;
      }
      .chart2 {
        grid-area: chart2;
        .echarts-for-react {
          margin: 0 auto;
          canvas {
            width: 100%;
          }
        }
      }
      .chart3 {
        grid-area: chart3;
      }
      .chart4 {
        grid-area: chart4;
      }
      .chart5 {
        grid-area: chart5;
      }
      .chart6 {
        grid-area: chart6;
      }

      .chart:nth-of-type(n + 3) {
        margin-top: 2.8vw;
      }

      .slider {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 7vw;
        width: 10vw;
        padding: 5px;
        top: 23vw;
        left: 26vw;
        background-color: rgba(246, 246, 246, 1);
        border-radius: 6px;
      }

      /* background-color: rgba(255, 99, 71, 0.1); */
    }
  }
`;
