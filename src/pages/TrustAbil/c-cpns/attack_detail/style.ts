import styled from "styled-components";
import attack from "@/assets/images/attack.png";
import { url } from "inspector";

export const AttackDetWrap = styled.div`
  height: 300px;
  background: url(${attack}) no-repeat center/contain;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;

  /* .left,
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  .box {
    width: 80%;
    position: absolute;
    top: 22%;
    left: 2%;
    .ant-select-multiple.ant-select-lg {
      font-size: 13px;
      border: 2px solid ${(props) => props.theme.color.secondColor};
      border-radius: 10px;
    }
  }
`;
