import styled from "styled-components";

export const ModelDetailWrap = styled.div`
  /* position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0; */
  .model_header {
    display: flex;
    justify-content:center
    font-size: 14px;
    line-height: 30px;

    .icon_index {
      width: 30px;
      height: 30px;
      text-align: center;
      color: white;
      margin-right:10px;
      background-color: black;
      border-radius: 4px;
    }
    .model_name{
        font-weight:700
    }
  }

.chart{
    width:90%;
    height:31vw;
    display:flex;
    justify-content:center;
    align-items:center;


}

  .explain{
    margin-top:1.2vw;
    .explain_name span{
        /* color: #8c909f; */
        font-weight:700
        font-size:15px;
    }
    p{
        margin:1.2vw 2.4vw 0 0;
        color: #8c909f;
        font-size:14px;
    }
  }
`;
