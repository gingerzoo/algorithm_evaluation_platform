import styled from "styled-components";

export const NaviWrap = styled.div`
  margin: 10px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: rgb(161, 160, 160);
  }

  a {
    text-decoration: none;
    color: black;
    cursor: pointer;
    &:hover {
      color: black;
    }
    &.active {
      color: black;
      font-weight: 700;
    }
  }
`;
