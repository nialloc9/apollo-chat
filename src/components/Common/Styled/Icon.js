import Styled from "styled-components";
import SemanticIcon from "semantic-ui-react/dist/commonjs/elements/Icon";
import { THEME_COLOR } from "../../../common/style";

export const Icon = Styled(SemanticIcon)`
    margin: ${({ margin = "auto auto" }) => `${margin} !important`};
    color: ${({ color = THEME_COLOR }) => color};
    cursor: ${({ cursor = "auto" }) => cursor};
`;

export default Icon;
