import styled from "styled-components";
import logo from "@/assets/images/logo2.jpg";

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4.8vw;
  padding: 0 4.8vw;

  .btn:hover {
    cursor: pointer;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    .divider {
      margin: 0 1.6vw;
    }
  }

  .left .logo {
    height: 3vw;
    line-height: 3vw;
    width: 3.2vw;
    text-align: center;
    /* font-size: 16px; */
    color: white;
    background: url(${logo}) 0 0 / contain no-repeat;
  }
`;
