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
    margin: 0 auto;
  }
  button.createBtn {
    height: 3.8vw;
    line-height: 3.8vw;
    margin-right: 4.8vw;
    padding: 0 2.2vw;
    ${(props) => props.theme.mixin.btnHover}
  }
`;

export const CreateDataInput = styled.div`
  margin-top: 6.5vw;
  table {
    margin: 0 auto;
  }
`;
