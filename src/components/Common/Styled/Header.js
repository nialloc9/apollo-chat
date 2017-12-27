import Styled from 'styled-components';
import SemanticHeader from 'semantic-ui-react/dist/commonjs/elements/Header'
import { CUTTY_SARK } from '../../../common/style';

const Header = Styled(SemanticHeader)`
    color: ${({color = CUTTY_SARK}) => color} !important;
    margin: ${({margin = "auto auto"}) => margin} !important;
`;

export default Header;