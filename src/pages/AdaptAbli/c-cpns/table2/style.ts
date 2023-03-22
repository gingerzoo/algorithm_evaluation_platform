import styled from "styled-components";
export const Table2Wrapper = styled.div`
  .ant-btn-primary {
    background-color: #eeeeee;
    border: 1px dashed #666666;
    color: #666666;
  }

  .newCondi {
    background-color: #65b3fa;
    border: none;

    padding: 0 4vw;
    font-size: 1.3vw;
    color: white;
  }
  table {
    /* width: 900px; */
    /* min-width: 850px; */
    /* width: 70vw; */
    td {
      .intensity,
      .weight {
        margin: 0 1.2vw 0 1vw;
      }
      &.evaluation {
        background-color: #79cc86;
      }

      .preWork {
        margin-right: 0.5vw;
      }
      .viewPic {
        margin-top: 0.4vw;
      }

      .ant-modal .ant-modal-content .ant-modal-header .ant-modal-title {
        text-align: center;
      }
    }
  }
`;
