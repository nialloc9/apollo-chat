import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SemanticForm from "semantic-ui-react/dist/commonjs/collections/Form";
import Error from "./Error";
import Warning from "./Warning";
import Success from "./Success";

const Field = SemanticForm.Field;

class Form extends PureComponent {
    static propTypes = {
        error: PropTypes.string,
        warning: PropTypes.string,
        success: PropTypes.string
    };

    static defaultProps = {
        error: "",
        warning: "",
        success: ""
    };

    render() {
        const { children, error, warning, success, ...rest } = this.props;

        return (
            <SemanticForm {...rest}>
                {children}
                <Error error={error} touched={true} />
                <Warning warning={warning} touched={true} />
                <Success success={success} touched={true} />
            </SemanticForm>
        );
    }
}

export { Field };
export default Form;
