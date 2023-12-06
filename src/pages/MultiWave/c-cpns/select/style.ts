import styled from "styled-components";
// import attack from "@/assets/images/attack.png";
import { url } from "inspector";

export const AttackDetWrap = styled.div`
  margin: 3.5vw 0;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .ant-select.ant-select-lg,
    .ant-select-multiple.ant-select-lg {
      /* font-size: 13px; */
      border-radius: 10px;
    }

    .ant-select-selector {
      border: 2px solid ${(props) => props.theme.color.secondColor};
      border-radius: 10px;
      .ant-select-selection-placeholder {
        font-size: 0.9vw;
        color: ${(props) => props.theme.textColor.primaryColor};
      }
    }

    .Radio {
      margin-bottom: 10px;
    }
  }
`;
