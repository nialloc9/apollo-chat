import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import SemanticCheckbox from "semantic-ui-react/dist/commonjs/modules/Checkbox";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Label from "./Label";
import Error from "./Error";
import Warning from "./Warning";
import { remCalc } from "../../../common/helpers";

const StyledCheckbox = Styled(SemanticCheckbox)`
    margin: ${({ margin = `${remCalc(4)} 0 0 ${remCalc(5)}` }) => margin};
`;

class Checkbox extends PureComponent {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        size: PropTypes.string,
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    };

    handleChange = (e, { checked }) => {
        const { input: { onChange } } = this.props;
        onChange(checked);
    };

    render = () => {
        const { label, meta, input, ...rest } = this.props;

        const { value: { checked }, ...inputProps } = input;

        return (
            <Form.Field>
                <Label inputLabel={label} />
                <StyledCheckbox
                    {...rest}
                    {...inputProps}
                    checked={checked}
                    onChange={this.handleChange}
                />
                <Error {...meta} />
                <Warning {...meta} />
            </Form.Field>
        );
    };
}

export default Checkbox;
