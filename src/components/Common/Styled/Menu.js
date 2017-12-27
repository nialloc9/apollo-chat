import React from 'react';
import Styled from "styled-components";
import SemanticMenu from "semantic-ui-react/dist/commonjs/collections/Menu";
import { MOBILE_SCREEN } from "../../../common/settings";
import { remCalc } from '../../../common/helpers';

const SemanticItem = SemanticMenu.Item;

export const Menu = Styled(({ fontSize, backgroundColor, mobileDisplay, display, height, mobileHeight, ...rest }) =>
    <SemanticMenu {...rest} />
)`
    font-size: ${({ fontSize = 14 }) => `${remCalc(fontSize)} !important`};
    background-color: ${({ backgroundColor = `none` }) =>
    `${backgroundColor} !important`};
    height: ${({height = "auto"}) => `${height} !important`};
    
    @media ${MOBILE_SCREEN} {
        display: ${({mobileDisplay, display = 'inline'}) => `${!mobileDisplay ? display : mobileDisplay} !important`};
        height: ${({mobileHeight, height = 'auto'}) => `${!mobileHeight ? height : mobileHeight} !important`};
    }
`;

export const Item = Styled(({ padding, margin, textColor, cursor, display, mobileDisplay, backgroundColor, ...rest }) =>
    <SemanticItem {...rest} />
)`
    padding: ${({ padding = `auto auto` }) => `${padding} !important`};
    margin: ${({margin = "auto auto"}) => margin}; 
    color: ${({textColor = "inherit"}) => `${textColor} !important`};
    cursor: ${({cursor = "auto"}) => cursor};
    display: ${({display = "inline"}) => display};
    background-color: ${({backgroundColor = "none"}) => `${backgroundColor} !important`};

    @media ${MOBILE_SCREEN} {
        display: ${({mobileDisplay, display = 'inline'}) => `${!mobileDisplay ? display : mobileDisplay} !important`};
    }
`;