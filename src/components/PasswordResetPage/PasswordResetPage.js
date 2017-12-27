import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal } from '../../actions/login'
import { passwordReset } from '../../actions/passwordReset'
import Block from '../../components/Common/Styled/Block';
import OpenNav from '../Common/OpenNav';
import PasswordResetForm from './PasswordResetForm';
import { remCalc } from '../../common/helpers';

// test url: http://dev.titan.co.uk:3000/password-reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMjM0NTYsImlhdCI6MTUxMTA5MzM2NH0.SPc4UOYqR9IY2LtmRUMgw4rXUcmgUMwpYl2-ALH3n70/email/nialloc9%40gmail.com

class PasswordResetPage extends Component {
    static propTypes = {
        active: PropTypes.string,
        loginModalOpen: PropTypes.bool.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                token: PropTypes.string,
                email: PropTypes.string
            })
        }).isRequired,
        onSetLoginModalOpen: PropTypes.bool.isRequired,
        onSetPassword: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        successMessage: PropTypes.string,
    };

    handleLoginClick = () => {
        const { loginModalOpen, onSetLoginModalOpen } = this.props;

        onSetLoginModalOpen(!loginModalOpen);
    };

    handleSubmit = ({ password, passwordConfirm }) => {
        const { match: { params: { token, email } }, onPasswordReset } = this.props;

        const decodedEmail = decodeURIComponent(email);
        const decodedToken = decodeURIComponent(token);

        return onPasswordReset({
            password,
            passwordConfirm,
            token: decodedToken,
            email: decodedEmail
        })
    };

    render() {
        const {
            errorMessage,
            successMessage
        } = this.props;

        return [
            <OpenNav
                key="openNavPasswordResetPage"
                onLoginClick={this.handleLoginClick
                }/>,
            <Block width="20%" tabletHWidth="40%" mobileWidth="100%" textAlign="center" margin={`${remCalc(100)} auto`}>
                <PasswordResetForm
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    onSubmit={this.handleSubmit}
                />
            </Block>
        ]
    }
}

/**
 * @param form
 * @param ownProps
 * @returns {{reduxForm: *}}
 */
const mapStateToProps = ({
                             passwordReset: {
                                 errorMessage,
                                 successMessage
                             },
                             login: {
                                 modalOpen: loginModalOpen
                             },
                             form
                         }, ownProps) => ({
    errorMessage,
    successMessage,
    loginModalOpen,
    reduxForm: form
});

/**
 * @param dispatch
 */
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSetLoginModalOpen: setModal,
            onPasswordReset: passwordReset
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage));