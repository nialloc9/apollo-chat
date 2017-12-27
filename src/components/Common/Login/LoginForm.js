import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import { CUTTY_SARK } from '../../../common/style';
import { remCalc } from '../../../common/helpers';
import Input from '../../Common/Form/Input';
import Form from '../../Common/Form/Form';
import Error from '../../Common/Form/Error';
import { email, required } from '../../Common/Form/rules';
import Block from '../Styled/Block';
import Button from '../Styled/Button';
import Header from '../Styled/Header';

export class LoginForm extends Component {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        open: PropTypes.bool.isRequired,
        onModalCancel: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onResetPasswordClick: PropTypes.func.isRequired,
        size: PropTypes.string,
        errorMessage: PropTypes.string,
    };

    static defaultProps = {
        size: 'tiny',
        errorMessage: '',
    };

    render() {
        const {
            pristine,
            submitting,
            errorMessage,
            onModalCancel,
            handleSubmit,
            onResetPasswordClick
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Grid stackable container columns={2}>
                    <Grid.Column>
                        <Header>Login</Header>
                    </Grid.Column>
                    <Grid.Column />
                    <Grid.Column>
                        <Field
                            name="email"
                            size="small"
                            type="text"
                            placeholder="Email*"
                            maxLength={40}
                            component={Input}
                            validate={[required, email]}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Field
                            name="password"
                            size="small"
                            type="password"
                            placeholder="Password*"
                            maxLength={40}
                            component={Input}
                            validate={[required]}
                        />
                    </Grid.Column>
                </Grid>

                <Modal.Actions>
                    <Block float="right" margin={`${remCalc(10)} ${remCalc(10)} ${remCalc(10)} auto`}>
                        <Button
                            onClick={onModalCancel}
                            margin={`auto ${remCalc(10)} auto auto`}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={pristine || submitting}
                            backgroundColor={CUTTY_SARK}
                            loading={submitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Block>
                    <Block
                        margin={`${remCalc(10)} auto auto ${remCalc(16)}`}
                        onClick={onResetPasswordClick}
                        cursor="pointer"
                    >
                        Forgotton password?
                    </Block>
                </Modal.Actions>
                <Block margin={`${remCalc(55)} auto auto auto`} width="50%" textAlign="center">
                    <Error error={errorMessage} />
                </Block>
            </Form>
        );
    }
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm);
