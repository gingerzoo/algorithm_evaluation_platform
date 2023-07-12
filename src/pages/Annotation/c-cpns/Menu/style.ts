import styled from "styled-components";

export const MenuWrap = styled.div`
  .menu {
    display: flex;
    .menu_title {
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      margin-right: 10px;
      color: #8c909f;
      font-size: 20px;
      font-weight: 700;
    }

    .menu_link {
      margin: 10px;
      width: 100px;
      height: 40px;
      border-radius: 12px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      &:hover {
        background-color: rgb(161, 160, 160);
      }
      &.active {
        background-color: rgba(40, 123, 140, 0.7);
        a {
          font-weight: 700;
          color: white;
        }
      }

      a {
        text-decoration: none;
        color: black;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
`;
