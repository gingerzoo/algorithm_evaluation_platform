import styled from "styled-components";

export const CooperWrap = styled.div`
  table {
    min-width: 60vw;
    .describe {
      max-width: 47.5vw;
      padding: 0.8vw 1.5vw;
    }
    margin-bottom: 20px;
    .bold {
      font-weight: bold;
    }
  }
`;

export const CreateTaskWraper = styled.div`
  table {
    /* margin: 0 auto; */
    display: flex;
    justify-content: center;
    margin: 3vw 0;

    button.createBtn {
      font-weight: 700;
      font-size: 1.2vw;
      margin-right: 4.5vw;
      padding: 1vw 2.2vw;
      ${(props) => props.theme.mixin.btnHover}
    }
  }
`;

export const CreateDataInput = styled.div`
  margin-top: 6.5vw;
  table {
    margin: 0 auto;
  }
`;
