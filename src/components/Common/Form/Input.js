import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import StyledInput from "../Styled/Input";
import Label from "./Label";
import Error from "./Error";
import Warning from "./Warning";

class Input extends PureComponent {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        size: PropTypes.string,
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    };

    render() {
        const { label, meta, input, ...rest } = this.props;

        return (
            <Form.Field>
                <Label inputLabel={label} />
                <StyledInput {...input} {...rest} />
                <Error {...meta} />
                <Warning {...meta} />
            </Form.Field>
        );
    }
}

export default Input;
