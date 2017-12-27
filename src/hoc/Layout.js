import React, { Component } from "react";
import PropTypes from "prop-types";
import Block from "../components/Common/Styled/Block";
const Layout = (WrappedComponent, customProps) =>
    class Layout extends Component {
        static propTypes = {
            active: PropTypes.string
        };

        render() {
            const { active } = customProps;

            return (
                <Block>
                    <WrappedComponent
                        {...this.props}
                        {...this.state}
                        {...customProps}
                    />
                </Block>
            );
        }
    };

export default Layout;
