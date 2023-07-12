import styled from "styled-components";

export const AnnotationWrap = styled.div`
  background-color: #dfdfdf;
  margin: 0;
  width: 68vw;
  margin: 10px auto;

  .annaotaion_body {
    padding: 3.2vw;

    .rule_item {
      margin: 50px 0;

      a {
        font-size: 20px;
        color: royalblue;
        &:visited {
          font-size: 20px;
          color: royalblue;
        }
      }
      p {
        margin: 8px 0;
      }
    }
  }
`;
