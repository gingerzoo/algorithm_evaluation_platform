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
    border-right: 2px solid rgba(81, 165, 342, 1);
    border-left: 2px solid rgba(81, 165, 342, 1);
  }
`;
