import Styled from "styled-components";
import { Link } from "react-router-dom";

const SoftLink = Styled(Link)`
    color: ${({ color = "inherit" }) => `${color} !important`};
    cursor: ${({ pointer = "pointer" }) => pointer};
`;

export default SoftLink;
