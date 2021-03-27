import styled, { css, keyframes } from 'styled-components';

// animation of question number indicator
const animation = (width) => css`${
  keyframes`
        100%{
          width: ${width}%;
        }`
}`;
// styled component of question number indicator
const QuestionIndicator = styled.div`
  border-radius: 6px;
  background: black;
  height: 100%;
  width: ${(props) => props.prevWidth}%;
  animation-name: ${(props) => animation(props.width)};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  transition-timing-function: cubic-bezier(.17,.67,.83,.67);
`;

// we need this style variable to change selected button style.
const style = {
  background: 'transparent',
  boxShadow: '0 0 3px 1px black',
};

export { QuestionIndicator, style };
