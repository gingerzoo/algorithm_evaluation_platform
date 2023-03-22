import styled from "styled-components";

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
    height: 1.9vw;
    line-height: 1.9vw;
    width: 4.5vw;
    text-align: center;
    font-size: 16px;
    color: white;
    background-color: #5692fc;
  }
`;
