import styled from "styled-components";
import logo from "@/assets/images/logo2.jpg";

export const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4.8vw;
  z-index: 9;
  background: rgba(245, 245, 245, 0.9);

  .ant-modal .ant-modal-content .ant-modal-body .history_list {
    background: red;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 4.8vw;
    padding: 0 12vw 0 4.8vw;
    .btn {
      font-size: 1.1vw;
      &:hover {
        cursor: pointer;
      }
    }

    .left {
      cursor: pointer;
      h2.algor {
        font-size: 1.7vw;
      }
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

    .right .btn {
      color: ${(props) => props.theme.color.goldenColor};
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  /* .ant-modal .ant-modal-content .ant-modal-body .history_list {
    margin-top: 20px;
  } */
`;

export const HistoryModalWrap = styled.div`
  margin-top: 12px;
  display: flex;
  row-gap: 12px;
  column-gap: 15px;
  flex-wrap: wrap;
`;
