import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import LoginForm from './LoginForm';
import ForgottenPasswordForm from './ForgottenPasswordForm';
import { setLogin, resetLogin, setModal } from '../../../actions/login';
import { setForgottenPassword } from '../../../actions/forgottenPassword';

export class Login extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        loginErrorMessage: PropTypes.string.isRequired,
        forgottenPasswordErrorMessage: PropTypes.string.isRequired,
        forgottenPasswordSuccessMessage: PropTypes.string.isRequired,
        onModalCancel: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
        onResetLogin: PropTypes.func.isRequired,
        onSetForgottenPassword: PropTypes.func.isRequired,
        size: PropTypes.string,
    };

    state = {
        openForm: 1
    };

    handleBack = () => {
        this.setState({
            openForm: 1
        })
    };

    handleForward = () => {
        this.setState({
            openForm: 2
        })
    };

    static defaultProps = {
        size: 'tiny',
    };

    handleModalOpen = () => {
        const { open, onSetLoginModal } = this.props;
        onSetLoginModal(!open);
    };

    componentDidMount(){
        const { onResetLogin } = this.props;

        onResetLogin();
    }

    render() {
          const {
            open,
            size,
              loginErrorMessage,
              forgottenPasswordErrorMessage,
              forgottenPasswordSuccessMessage,
              onSetLogin,
              onSetForgottenPassword
          } = this.props;

          const { openForm } = this.state;

          return (
                <Modal open={open} size={size}>
                      <Modal.Content>
                          { openForm === 1 && <LoginForm
                              errorMessage={loginErrorMessage}
                              onModalCancel={this.handleModalOpen}
                              onResetPasswordClick={this.handleForward}
                              onSubmit={onSetLogin}
                          /> }
                          { openForm === 2 && <ForgottenPasswordForm
                              errorMessage={forgottenPasswordErrorMessage}
                              successMessage={forgottenPasswordSuccessMessage}
                              onModalBack={this.handleBack}
                              onSubmit={onSetForgottenPassword}
                          />}
                      </Modal.Content>
                </Modal>
          );
    }
}
/**
 * @param form
 * @param ownProps
 * @returns {{reduxForm: *}}
 */
const mapStateToProps = ({
                             login: {
                                 errorMessage: loginErrorMessage,
                                 modalOpen: open
                             },
                             forgottenPassword: {
                                 errorMessage: forgottenPasswordErrorMessage,
                                 successMessage: forgottenPasswordSuccessMessage
                             },
                             form
                         }, ownProps) => ({
    loginErrorMessage,
    open,
    forgottenPasswordErrorMessage,
    forgottenPasswordSuccessMessage,
    reduxForm: form
});

/**
 * @param dispatch
 */
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onSetLogin: setLogin,
            onResetLogin: resetLogin,
            onSetLoginModal: setModal,
            onSetForgottenPassword: setForgottenPassword
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Login);