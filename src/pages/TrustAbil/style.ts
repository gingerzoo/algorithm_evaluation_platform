import styled from "styled-components";

export const TrustWrap = styled.div`
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
`;
