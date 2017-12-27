import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";

class Information extends Component {
    static propTypes = {
        information: PropTypes.string,
        touched: PropTypes.bool
    };

    render() {
        const { information, touched } = this.props;

        if (!information || !touched) {
            return null;
        }

        return <Message info>{information}</Message>;
    }
}

export default Information;
