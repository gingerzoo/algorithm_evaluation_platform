import styled from "styled-components";

export const AnnotationWrap = styled.div`
  background-color: #dfdfdf;
  margin: 0;
  width: 68vw;
  margin: 10px auto;

  .annaotaion_body {
    padding: 3.2vw;
  }
  .back_home {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 0.8vw 1.6vw;
    ${(props) => props.theme.mixin.btnHover}
  }
`;
