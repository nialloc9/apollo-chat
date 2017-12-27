import React from 'react';
import Styled from "styled-components";
import SemanticImage from "semantic-ui-react/dist/commonjs/elements/Image";
import { MOBILE_SCREEN } from '../../../common/settings';
import { remCalc } from '../../../common/helpers';

export const Image = Styled(({ pointer, display, height, width, maxWidth, mobileWidth, ...rest }) =>
    <SemanticImage {...rest} />
)`
    cursor: ${({ pointer = "auto" }) => pointer};
    display: ${({ display = "inline" }) => display};
    height: ${({ height = "auto" }) => `${height} !important`};
    width: ${({ width = "auto" }) => `${width} !important`};
    max-width:  ${({ maxWidth = "none" }) => `${maxWidth} !important`};
    margin: auto;
    @media ${MOBILE_SCREEN} {
        width: ${({mobileWidth, width = "auto"}) => `${!mobileWidth ? width : mobileWidth} !important`};
    }
`;

export const Logo = Styled(SemanticImage)`
    max-width: ${({ maxWidth = "50% !important" }) => maxWidth};
    cursor: ${({ cursor = "pointer" }) => cursor};
    
    @media ${MOBILE_SCREEN} {
        width: ${remCalc(50)} !important;
    }
`;

