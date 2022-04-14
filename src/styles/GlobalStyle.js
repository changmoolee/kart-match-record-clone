import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
body {
  font-family: 'Noto Sans KR', 'Apple SD Gothic Neo';
}
`;

export default GlobalStyle;
