import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Block from "../../Common/Styled/Block";
import Login from '../../Common/Login';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import { remCalc } from '../../../common/helpers';

class SignUpForm extends PureComponent {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        signUpErrorMessage: PropTypes.string.isRequired,
        signUpSuccessMessage: PropTypes.string.isRequired,
        onLoginClick: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string,
        success: PropTypes.string,
    };

    state = {
        page: 0,
    };

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1
        });
    };

    handlePreviousPage = () => {
        this.setState({
            page: this.state.page - 1
        });
    };

    componentDidMount(){
        const { onResetSignUp } = this.props;

        onResetSignUp();
    }

    render() {
        const {
            signUpErrorMessage,
            onSetSignUp,
            onLoginClick
        } = this.props;

        const { page } = this.state;

        return [
            <Block key="sign-up-block-wrapper" margin={`${remCalc(250)} auto auto auto`}>
                {
                    page !== 1 ?
                        <FirstPage signUpErrorMessage={signUpErrorMessage} onSubmit={this.handleNextPage} onLoginClick={onLoginClick}/> :
                        <SecondPage signUpErrorMessage={signUpErrorMessage} onSubmit={onSetSignUp} onPreviousPage={this.handlePreviousPage} />

                }
            </Block>,
            <Login
                key="signUpFormLoginKey"
                form="signUpFormLogin"
            />
        ];
    }
}

export default SignUpForm;