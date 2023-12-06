import styled from "styled-components";
import attack from "@/assets/images/attack.png";
import { url } from "inspector";

export const AttackDetWrap = styled.div`
  height: 200px;
  width: 100%;
  margin-top: 0.9vw;
  background: white url(${attack}) no-repeat right/65% 95%;

  position: relative;
  /* opacity: 0.8; */

  .box {
    width: 45%;
    position: absolute;
    top: 20%;
    left: 1vw;

    .ant-select-multiple.ant-select-lg {
      font-size: 0.8vw;
      border: 2px solid ${(props) => props.theme.color.secondColor};
      border-radius: 10px;
    }
  }
`;
