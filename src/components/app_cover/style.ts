import styled from "styled-components";

interface Iprops {
  width: number;
}
export const CoverWrap = styled.section<Iprops>`
  color: white;

  /* padding: 30px 0; */
  .cover-content {
    width: ${(props) => props.width + "px"};
    /* overflow: hidden; */
    min-height: calc(100vh - 150px);
    margin: 20px auto;
    padding: 0 10px;
    border-right: 3px solid ${(props) => props.theme.color.secondColor};
    border-left: 3px solid ${(props) => props.theme.color.secondColor};
  }
`;
