import styled from "styled-components";
export const MenuItemWrap = styled.div`
  margin: 50px 0;

  a {
    display: block;
    font-size: 20px;
    line-height: 50px;
    color: rgb(7, 140, 200);
    border-top: solid 3px teal;
    &:visited {
      font-size: 20px;
      color: rgb(7, 120, 200);
    }
  }
  p {
    margin: 8px 0;
    &.describe {
      line-height: 22px;
      text-align: justify;
    }
  }
`;
