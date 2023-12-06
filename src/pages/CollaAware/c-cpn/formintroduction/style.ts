import styled from "styled-components";

export const Introduction = styled.div`
  button.createBtn {
    height: 25px;
    padding: 0 2.2vw;
    ${(props) => props.theme.mixin.btnHover}
  }
  table {
    margin-bottom: 40px;
  }
  input.fileinput {
    height: 25px;
    background-color: #f5f5f5;
    color: #333;
    border: 2px solid rgba(49, 156, 171, 0.9);
    border-radius: 4px;
    padding: 1px;
  }
`;
