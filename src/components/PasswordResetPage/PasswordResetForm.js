import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Grid } from 'semantic-ui-react';
import Form from '../../components/Common/Form/Form';
import Input from '../../components/Common/Form/Input';
import { required, minLength } from '../Common/Form/rules';
import Button from '../Common/Styled/Button';
import Header from '../Common/Styled/Header';
import { remCalc } from '../../common/helpers';
import { PUERTO_RICO } from '../../common/style';

class PasswordResetForm extends Component {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    render() {
        const {
            pristine,
            submitting,
            errorMessage,
            successMessage,
            handleSubmit
        } = this.props;

        return (
            <Form
                error={errorMessage}
                success={successMessage}
                onSubmit={handleSubmit}
            >
                <Grid stackable columns={1} stretched>
                    <Grid.Column>
                        <Header as="h3" color={PUERTO_RICO} margin={`auto auto ${remCalc(-20)} auto`}>Reset password</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Field
                            name="password"
                            type="password"
                            component={Input}
                            placeholder="Enter new password here"
                            validate={[required]}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Field
                            name="passwordConfirm"
                            type="password"
                            component={Input}
                            placeholder="Enter password again"
                            validate={[required]}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            disabled={pristine || submitting}
                            backgroundColor={PUERTO_RICO}
                            loading={submitting}
                            type="submit"
                        >
                            Submit</Button>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

export default reduxForm({
    form: "passwordReset"
})(PasswordResetForm);