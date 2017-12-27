import React from "react";
import Styled from "styled-components";

const Link = Styled("a")`
    color: ${({ color = "inherit" }) => `${color} !important`};
    cursor: ${({ pointer = "pointer" }) => pointer};
`;

export default Link;
