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
import Success from '../../Common/Form/Success';
import { email, required } from '../../Common/Form/rules';
import Block from '../Styled/Block';
import Button from '../Styled/Button';
import Header from '../Styled/Header';

export class ForgottenPasswordForm extends Component {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        open: PropTypes.bool.isRequired,
        onModalBack: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        size: PropTypes.string,
        errorMessage: PropTypes.string,
        successMessage: PropTypes.string,
    };

    static defaultProps = {
        size: 'tiny',
        errorMessage: '',
        successMessage: ''
    };

    render() {
        const {
            pristine,
            submitting,
            errorMessage,
            successMessage,
            onModalBack,
            handleSubmit,
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Grid stackable container columns={1}>
                    <Grid.Column>
                        <Header>Forgotten password</Header>
                        <Block>To reset your password please enter your email below.</Block>
                    </Grid.Column>
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
                    <Grid.Column />
                </Grid>

                <Modal.Actions>
                    <Block float="right" margin={`${remCalc(10)} ${remCalc(10)} ${remCalc(10)} auto`}>
                        <Button
                            onClick={onModalBack}
                            margin={`auto ${remCalc(10)} auto auto`}
                        >
                            Back
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
                </Modal.Actions>
                <Block margin={`${remCalc(55)} auto auto auto`} width="50%" textAlign="center">
                    <Error error={errorMessage} />
                    <Success success={successMessage} />
                </Block>
            </Form>
        );
    }
}

export default reduxForm({
    form: 'forgottenPassword'
})(ForgottenPasswordForm);
