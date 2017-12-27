import React, { Component } from "react";
import PropTypes from "prop-types";

const withDisplay = WrappedComponent =>
    class Display extends Component {
        static propTypes = {
            display: PropTypes.bool
        };

        render() {
            const { display } = this.props;

            if (!display) {
                return null;
            }

            return <WrappedComponent {...this.state} {...this.props} />;
        }
    };

export default withDisplay;
