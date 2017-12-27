import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "../Styled/Message";
import { remCalc } from '../../../common/helpers';

class Error extends PureComponent {
    static propTypes = {
        error: PropTypes.string,
        touched: PropTypes.bool
    };

    static defaultProps = {
        error: "",
        touched: true
    };

    render() {
        const { error, touched, ...rest } = this.props;

        if (error === "" || !touched) {
            return null;
        }

        return <Message margin={`${remCalc(20)} auto auto auto`} negative {...rest}>{error}</Message>;
    }
}

export default Error;
