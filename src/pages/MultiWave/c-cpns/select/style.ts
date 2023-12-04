import styled from "styled-components";
// import attack from "@/assets/images/attack.png";
import { url } from "inspector";

export const AttackDetWrap = styled.div`
  /* height: 300px; */
  margin: 3.5vw 0;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* position: relative; */

  /* .left,
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  .box {
    /* width: 80%; */
    /* position: absolute;
    top: 22%;
    left: 2%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .ant-select.ant-select-lg,
    .ant-select-multiple.ant-select-lg {
      font-size: 13px;
      border: 2px solid ${(props) => props.theme.color.secondColor};
      border-radius: 10px;
    }
    .Radio {
      margin-bottom: 10px;
    }
  }
`;
