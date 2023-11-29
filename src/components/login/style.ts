import styled from "styled-components";

export const LoginWrap = styled.div`
  .common-login {
    position: absolute;
    top: 0;
    right: 5px;
    height: 4.8vw;
    /* padding: 0 4.8vw; */
    font-size:1.15vw;
    width: 10vw;
    border-radius: 10px;
    background-color: transparent;
  }
  .login {
    text-align: center;
    line-height: 4.8vw;

    color: #fcca00;
    cursor: pointer;
  }

  .user_info {
    /* font-size: 12px; */
    /* background-color: pink; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    /* flex-direction: column; */
    .logout {
      /* position: absolute;
      bottom: 1px;
      right: 5px; */
      font-size: 10px;
      color: white;
      padding: 3px 5px;
      border-radius: 5px;

      background-color: #bbb;
      cursor: pointer;
      margin-left: 5px;
    }
    .curUserName {
    flex:1
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden; /* 隐藏文本溢出部分 */
      text-overflow: ellipsis; /* 使用省略号来表示溢出的文本 */
      margin-left:5px;
    }
  }
`;
