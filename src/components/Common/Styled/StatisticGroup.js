import Styled from 'styled-components';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic';
import { CUTTY_SARK } from '../../../common/style';

const SemanticStatisticGroup = Statistic.Group;

const StatisticGroup = Styled(SemanticStatisticGroup)`
    .value { color: ${({color = CUTTY_SARK}) => color} !important}; 
    .label { color: ${({color = CUTTY_SARK}) => color} !important};
`;

export default StatisticGroup;