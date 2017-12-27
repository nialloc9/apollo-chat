import Styled from "styled-components";
import { remCalc } from "../../../common/helpers";
import { MOBILE_SCREEN, TABLET_HORIZONTAL_SCREEN } from '../../../common/settings';
import { THEME_COLOR, PUERTO_RICO, CUTTY_SARK } from '../../../common/style';

const Block = Styled("div")`
    margin: ${({ margin = 0 }) => margin};
    padding: ${({ padding = 0 }) => padding};
    height: ${({ height = "auto" }) => height};
    line-height: ${({ lineHeight = "auto" }) => lineHeight};
    text-align: ${({ textAlign = "auto" }) => textAlign};
    vertical-align: ${({ verticalAlign = "auto" }) => verticalAlign};
    display: ${({ display = "auto" }) => display};
    background-color: ${({ backgroundColor = "none" }) => backgroundColor};
    background-image: ${({ backgroundImage = "none" }) => `url(${backgroundImage})`};
    background-position: ${({ backgroundPosition = "0% 0%" }) => backgroundPosition};
    position: ${({ position = "static" }) => position};
    width: ${({ width = "auto" }) => width};
    float: ${({ float = "none" }) => float};
    border: ${({ border = "none" }) => border};
    opacity: ${({ opacity = 1 }) => opacity};
    min-height: ${({ minHeight = 0 }) => remCalc(minHeight)};
    max-height: ${({ maxHeight = 'none' }) => maxHeight};
    max-width: ${({ maxWidth = 'none' }) => maxWidth};
    font-size: ${({ fontSize = "medium" }) => remCalc(fontSize)};
    word-spacing: ${({ wordSpacing = "normal" }) => wordSpacing};
    color: ${({ color = CUTTY_SARK }) => color};
    overflow: ${({ overflow = "visible" }) => overflow};
    top: ${({ top = "0" }) => top};
    right: ${({ right = "0" }) => right};
    min-width: ${({ minWidth = "none" }) => minWidth};
    border: ${({ border = "none" }) => border};
    border-radius: ${({ borderRadius = "0" }) => borderRadius};
    cursor: ${({ cursor = "auto" }) => cursor};
    text-decoration: ${({ textDecoration = "none" }) => textDecoration};
    
    &:hover {
        color ${({ hoverColor, color = CUTTY_SARK }) => !hoverColor ? color : hoverColor}
    }
    
    ::-webkit-scrollbar {
      width: ${({ scrollBarWidth = remCalc(10) }) => scrollBarWidth};
      background-color: ${({ scrollBackgroundColor = PUERTO_RICO }) => scrollBackgroundColor};
      border-radius: ${({ scrollBarBorderRadius = remCalc(5) }) => scrollBarBorderRadius};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ scrollBarThumbBackgroundColor = THEME_COLOR }) => scrollBarThumbBackgroundColor};
      border-radius: ${({ scrollBarThumbBorderRadius = remCalc(5) }) => scrollBarThumbBorderRadius};
    }
    
    ::-webkit-scrollbar-face-color: ${({ scrollBarFaceColor = THEME_COLOR }) => scrollBarFaceColor};
    ::-webkit-scrollbar-arrow-color: ${({ scrollBarArrowColor = THEME_COLOR }) => scrollBarArrowColor};
    ::-webkit-scrollbar-track-color: ${({ scrollBarTrackColor = PUERTO_RICO }) => scrollBarTrackColor};
    
    @media ${TABLET_HORIZONTAL_SCREEN} {
        margin: ${({ tabletHorizontalMargin, margin = 0 }) => !tabletHorizontalMargin ? margin : tabletHorizontalMargin};
        background-image: ${({ backgroundImageHorizontalTablet, backgroundImage = "none" }) => `url(${!backgroundImageHorizontalTablet ? backgroundImage : backgroundImageHorizontalTablet})`};
        background-position: ${({ backgroundPositionHorizontalTablet, backgroundPosition = "0% 0%" }) => !backgroundPositionHorizontalTablet ? backgroundPosition : backgroundPositionHorizontalTablet};
        padding: ${({ paddingHorizontalTablet, padding = "0% 0%" }) => !paddingHorizontalTablet ? padding : paddingHorizontalTablet};
        ${({ tabletHWidth = false }) => tabletHWidth && `width: ${tabletHWidth}`};
        min-width: ${({ minHorizontalWidth, minWidth = "none" }) => !minHorizontalWidth ? minWidth : minHorizontalWidth};
    }
    
    @media ${MOBILE_SCREEN} {
        margin: ${({ mobileMargin, margin = 0 }) => !mobileMargin ? margin: mobileMargin};
        background-image: ${({ backgroundImageMobile, backgroundImage = "none" }) => `url(${!backgroundImageMobile ? backgroundImage : backgroundImageMobile})`};
        background-position: ${({ backgroundPositionMobile, backgroundPosition = "0% 0%" }) => !backgroundPositionMobile ? backgroundPosition : backgroundPositionMobile};
        padding: ${({ paddingMobile, padding = "0% 0%" }) => !paddingMobile ? padding : paddingMobile};
        width: ${({ mobileWidth, width = "auto" }) => !mobileWidth ? width : mobileWidth};
        min-width: ${({ mobileMinWidth, minWidth = "none" }) => !mobileMinWidth ? minWidth : mobileMinWidth};
    }
`;

export default Block;