import styled from "styled-components";

export const MenuWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  background-color: #447ed9;

  .logo {
    display: inline-block;
  }
  .ant-menu-item .ant-menu-title-content {
    color: white;
    font-size: 16px;
  }

  li.ant-menu-item {
    padding-inline: 30px;
  }
  .anticon .anticon-menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 22px;
  }

  .ant-menu-horizontal li.ant-menu-item {
    &:not(:first-child):hover {
      background-color: rgba(247, 247, 247, 0.2);
      /* background-color: #f7f7f7; */
    }
  }
`;
