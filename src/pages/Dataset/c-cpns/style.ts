import styled from "styled-components";

export const AddsetWrap = styled.div`
  /* .ant-form
    .ant-form-item:nth-child(4)
    .ant-row.ant-form-item-row
    .ant-col-14.ant-form-item-label {
    max-width: 23%;
    flex: 0 0 20%;
  } */

  .ant-form
    .ant-form-item
    .ant-row.ant-form-item-row
    .ant-col-4.ant-form-item-label {
    max-width: 23%;
    flex: 0 0 23%;
  }

  .ant-form
    .ant-form-item
    .ant-row.ant-form-item-row
    .ant-col-14.ant-form-item-control {
    display: block;
    flex: 0 0 70%;

    max-width: 78%;
  }

  .oper {
    /* display: flex;
    flex-direction: row;
    justify-content: flex-end; */
    .submit-btn {
      /* margin: 0 3.2vw 0 0; */
      margin-right: 3.2vw;
      ${(props) => props.theme.mixin.btnHover}
    }

    .ant-row {
      justify-content: flex-end;
    }
  }
`;
