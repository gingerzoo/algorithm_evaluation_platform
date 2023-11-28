import styled from "styled-components";

export const OrderWrap = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin-bottom: 1.4vw;
  .title {
    color: ${(props) => props.theme.textColor.primaryColor};
    font-weight: 700;
    font-size: 1.2vw;
    margin-right: 1.4vw;
  }

  .finish-icon {
    margin-left: 1.4vw;
  }
`;
