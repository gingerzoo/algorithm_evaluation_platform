import styled from "styled-components";

type Istate = {
  canTest: boolean;
};

export const AdaptWraper = styled.div<Istate>`
  .operate {
    display: flex;
    /* justify-content: flex-end; */
    padding-left: 3.2vw;
    margin-top: 2vw;

    .spinning {
      margin: 0 3vw 0 2vw;
    }

    .ant-btn.btn {
      height: auto;
      font-size: 1.3vw;
      padding: 0.5vw 1.5vw;
      border-radius: 8px;
    }
  }
`;
