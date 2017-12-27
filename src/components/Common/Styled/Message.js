import Styled from "styled-components";
import SemanticMessage from "semantic-ui-react/dist/commonjs/collections/Message";

const Message = Styled(SemanticMessage)`
    width: ${({ width = "100%" }) => width};
    margin: ${({ margin = `auto auto` }) => `${margin} !important`};
    text-align: ${({textAlign = "center"}) => textAlign};
`;

export default Message;
