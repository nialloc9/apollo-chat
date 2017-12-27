import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

export class OpenRoute extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        jwToken: PropTypes.string,
        pathname: PropTypes.string,
        exact: PropTypes.bool,
        location: PropTypes.object,
    };

    static defaultProps = {
        jwToken: "",
        exact: false,
        pathname: "/main",
        location: {}
    };

    render() {
        const { component: Component, exact, path, pathname, jwToken } = this.props;

        return (
            <Route
            exact={exact}
                path={path}
                render={props =>
                    (jwToken === "" ? (
                      <Component {...props} />
                    ) : (
                      <Redirect
                          to={{
                                pathname,
                                state: { from: props.location },
                            }}
                        />
                    ))}
          />
        );
    }
}

/**
 * @param jwToken
 * @returns {{jwtToken: *}}
 */
const mapStateToProps = ({authorise: { jwToken }}) => ({
    jwToken
});

export default connect(mapStateToProps)(OpenRoute);