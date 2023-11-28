import styled from "styled-components";

type Istate = {
  canTest: boolean;
  run_status: number;
};

export const AdaptWraper = styled.div<Istate>`
  font-size: 1.2vw;
  color: ${(props) => props.theme.textColor.primaryColor};

  .bold {
    font-weight: 700;
  }
  .ant-btn.btn {
    height: auto;
    font-size: 1.3vw;
    padding: 0.5vw 1.5vw;
    ${(props) => props.theme.mixin.btnHover}
  }

  .operate {
    display: flex;
    /* justify-content: flex-end; */
    padding-left: 3.2vw;
    margin: 2vw 0 3.5vw 0;

    .spinning {
      margin: 0 3vw 0 2vw;
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

  .checkbox {
    display: flex;
    justify-content: right;
    margin: -24px 2vw 8px;
    .transfor {
      font-size: 1vw;
      padding: 0.4vw 1.2vw;
    }

    /* margin: 0.5; */
  }
`;
