import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "../Styled/Message";
import { remCalc } from '../../../common/helpers';

class Warning extends PureComponent {
    static propTypes = {
        warning: PropTypes.string,
    };

    static defaultProps = {
        warning: ""
    };

    render() {
        const { warning, ...rest } = this.props;

        if (warning === "") {
            return null;
        }

        return <Message margin={`${remCalc(20)}`} color="yellow" {...rest}>{warning}</Message>;
    }
}

export default Warning;
