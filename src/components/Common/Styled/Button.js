import React from "react";
import Styled from "styled-components";
import SemanticButton from "semantic-ui-react/dist/commonjs/elements/Button";
import { THEME_COLOR } from "../../../common/style";
import { MOBILE_SCREEN } from '../../../common/settings';
import { remCalc } from '../../../common/helpers';

export const Button = Styled(({backgroundColor, color, display, margin, top, mobileMargin, mobileTop, mobileDisplay, mobileBackgroundColor, ...rest}) =>
    <SemanticButton {...rest} />
)`
  background-color: ${({ backgroundColor = THEME_COLOR }) =>
    `${backgroundColor} !important`};
  color: ${({ color = "white" }) => `${color} !important`};
  display: ${({display = "inline"}) => `${display} !important`};
  margin: ${({margin = "auto auto"}) => `${margin} !important`};
  top: ${({top = 0}) => `${remCalc(top)} !important`};
  
  @media ${MOBILE_SCREEN} {
    margin: ${({ mobileMargin, margin = "auto auto" }) => `${!mobileMargin ? margin : mobileMargin} !important`};
    top: ${({ mobileTop, top = 0 }) => `${remCalc(!mobileTop ? top : mobileTop)} !important`};
    display: ${({ mobileDisplay, display = "inline" }) => `${!mobileDisplay ? display : mobileDisplay} !important`};
    background-color: ${({ mobileBackgroundColor, backgroundColor = {THEME_COLOR} }) => `${!mobileBackgroundColor ? backgroundColor : mobileBackgroundColor} !important`};
  }
`;

export default Button;
