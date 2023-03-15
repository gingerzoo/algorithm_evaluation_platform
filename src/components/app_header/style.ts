import styled from "styled-components";

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 0 60px;

  .btn:hover {
    cursor: pointer;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    .divider {
      margin: 0 20px;
    }
  }

  .left .logo {
    height: 24px;
    line-height: 24px;
    width: 60px;
    text-align: center;
    font-size: 16px;
    color: white;
    background-color: #5692fc;
  }
`;
