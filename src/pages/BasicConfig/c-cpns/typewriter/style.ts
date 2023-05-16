import styled from "styled-components";

type Iprops = {
  isPending: boolean;
};

export const TypewriterWrap = styled.div<Iprops>`
  /* height: 100px; */
  width: 95%;
  margin-top: 20px;
  /* margin-right: 3vw; */
  padding: 15px;
  text-indent: 2em;
  line-height: 1.5;

  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px rgba(0, 0, 0, 0.5) inset; */

  color: #666;
  background-color: rgba(248, 128, 110, 0.3);
  /* border: 3px solid ${(props) => props.theme.color.orangeColor}; */
`;
