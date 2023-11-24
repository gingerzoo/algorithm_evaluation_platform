import styled from "styled-components";

export const SideWrap = styled.div`
  border-right: 2px solid #bbbbbb;
  width: 20vw;
  min-width: 200px;

  background-color: rgba(87, 151, 149, 0.1);

  /* background-color: rgba(0, 128, 128, 0.1); */
  ul.ant-menu {
    font-size: 16px;

    /* background-color: rgba(27, 145, 162, 0.1); */
  }

  /* li.ant-menu-item.ant-menu-item-selected {
  } */

  li.ant-menu-item,
  div.ant-menu-submenu-title {
    height: 3vw;
    min-height: 30px;
    max-height: 60px;
    line-height: 3vw;
  }
`;
