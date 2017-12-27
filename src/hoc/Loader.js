import React, { Component } from "react";
import PropTypes from "prop-types";
import SemanticLoader from "semantic-ui-react/dist/commonjs/elements/Loader";

const Loader = WrappedComponent =>
    class Loader extends Component {
        static propTypes = {
            loading: PropTypes.bool.isRequired,
            loadingIconSize: PropTypes.string,
        };

        static defaultProps = {
            loadingIconSize: "mini"
        };

        render() {
            const { loading, loadingIconSize, ...rest } = this.props;

            if (loading) {
                return <SemanticLoader
                    size={loadingIconSize}
                    active
                    inline
                />;
            }

            return <WrappedComponent {...this.state} {...rest} />;
        }
    };

export default Loader;
