import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "../Styled/Message";
import { remCalc } from '../../../common/helpers';

class Success extends PureComponent {
    static propTypes = {
        success: PropTypes.string
    };

    static defaultProps = {
        success: ""
    };

    render() {
        const { success, ...rest } = this.props;

        if (success === "") {
            return null;
        }

        return <Message margin={`${remCalc(20)} auto auto auto`} positive {...rest}>{success}</Message>;
    }
}

export default Success;
