import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { remCalc } from "../../../common/helpers";

const StyledLabel = Styled("label")`
    float: ${({ float = "left" }) => float};
    margin-left: ${({ marginLeft = remCalc(6) }) => marginLeft};
`;

class Label extends PureComponent {
    static propTypes = {
        inputLabel: PropTypes.string
    };

    render() {
        const { inputLabel, ...rest } = this.props;

        if (!inputLabel) {
            return null;
        }

        return <StyledLabel {...rest}>{inputLabel}</StyledLabel>;
    }
}

export default Label;
