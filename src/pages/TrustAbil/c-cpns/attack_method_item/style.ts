import styled from "styled-components";

export const AttackItemWrap = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor.primaryColor};

  ul.ulSquare {
    padding: 0 20px;

    &.advantage {
      list-style-type: square;
    }

    &.disadvantage {
      list-style-type: disc;
    }

    &.step {
      list-style-type: decimal;
    }
  }
  h4 {
    margin: 20px 0 10px 0;
  }
  h4.principle {
    margin-top: 15px;
  }
  h3.attack-name {
    color: black;

    margin-top: 25px;
  }
  p {
    text-indent: 2em;
  }
`;
