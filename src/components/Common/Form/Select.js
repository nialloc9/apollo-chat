import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import SemanticSelect from "semantic-ui-react/dist/commonjs/addons/Select";
import Styled from "styled-components";
import Label from "./Label";
import Error from "./Error";
import Warning from "./Warning";
import { remCalc } from "../../../common/helpers";

const StyledSelect = Styled(SemanticSelect)`
    height: ${remCalc(37)};
`;

class Select extends Component {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        size: PropTypes.string,
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired,
        options: PropTypes.array.isRequired
    };

    handleChange = (event, { value }) => {
        const { input: { onChange } } = this.props;
        onChange(value);
    };

    render() {
        const { label, meta, input, ...rest } = this.props;

        return (
            <Form.Field>
                <Label inputLabel={label} />
                <StyledSelect
                    {...input}
                    {...rest}
                    onChange={this.handleChange}
                />
                <Error {...meta} />
                <Warning {...meta} />
            </Form.Field>
        );
    }
}

export default Select;
