import styled from "styled-components";

type Istate = {
  canTest: boolean;
  run_status: number;
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
      ${(props) => props.theme.mixin.btnHover}
    }

    .btn.next {
      background-color: ${(props) =>
        props.run_status == 0 ? props.theme.color.primaryColor : "#C8C8C8"};

      &:hover {
        background-color: ${(props) =>
          props.run_status == 0 ? props.theme.color.primaryColor : "#C8C8C8"};
      }
    }
  }
`;
