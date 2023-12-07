import styled from "styled-components";

interface Iprops {
  width: number;
  isRemote: boolean;
}
export const CoverWrap = styled.section<Iprops>`
  color: white;

  /* padding: 30px 0; */
  .cover-content {
    /* width: ${(props) => props.width + "px"}; */
    width: 40vw;
    min-height: calc(100vh - 11vw);
    margin: 1.2vw auto;
    margin-left: ${(props) => (props.isRemote ? "30vw" : "auto")};
    padding: 0 10px;
    border-right: 3px solid ${(props) => props.theme.color.secondColor};
    border-left: 3px solid ${(props) => props.theme.color.secondColor};
  }
`;
