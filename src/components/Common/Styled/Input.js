import Styled from "styled-components";
import SemanticInput from "semantic-ui-react/dist/commonjs/elements/Input";
import { MOBILE_SCREEN, TABLET_HORIZONTAL_SCREEN } from '../../../common/settings';

const Input = Styled(SemanticInput)`
    width: ${({ width = "100%" }) => width};
    max-width: ${({ maxWidth = "none" }) => maxWidth};
    
    @media ${TABLET_HORIZONTAL_SCREEN} {
        max-width: ${({ maxHorizontalTabletWidth, maxWidth = "none" }) => !maxHorizontalTabletWidth ? maxWidth : maxHorizontalTabletWidth};
    }
    
    @media ${MOBILE_SCREEN} {
        max-width: ${({ mobileMaxWidth, maxWidth = "none" }) => !mobileMaxWidth ? maxWidth : mobileMaxWidth};
    }
`;

export default Input;
