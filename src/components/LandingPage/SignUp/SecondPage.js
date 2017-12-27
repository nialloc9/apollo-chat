import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Grid, Form as SemanticForm } from "semantic-ui-react";
import Button from "../../Common/Styled/Button";
import Block from "../../Common/Styled/Block";
import { Input, Form, Error } from "../../Common/Form";
import { required, minLength } from "../../Common/Form/rules";
import { CUTTY_SARK, PUERTO_RICO } from '../../../common/style';
import { remCalc } from '../../../common/helpers';

class SecondPage extends PureComponent {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onPreviousPage: PropTypes.func.isRequired,
        signUpErrorMessage: PropTypes.string,
    };

    static defaultProps = {
        signUpErrorMessage: ""
    };

    render() {
        const { pristine, submitting, handleSubmit, onPreviousPage, signUpErrorMessage } = this.props;

        return (
            <Form
                onSubmit={handleSubmit}
            >
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column computer={5}>
                            <Block backgroundColor={CUTTY_SARK} opacity="0.7" padding={remCalc(30)}>
                                <Field
                                    name="password"
                                    size="huge"
                                    type="password"
                                    placeholder="Password"
                                    maxLength={40}
                                    component={Input}
                                    validate={[required, minLength(6)]}
                                />
                            </Block>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="left">
                            <SemanticForm.Field>
                                <Button
                                    size="huge"
                                    disabled={pristine || submitting}
                                    loading={submitting}
                                    backgroundColor={PUERTO_RICO}
                                    onClick={onPreviousPage}
                                >
                                    Back
                                </Button>
                            </SemanticForm.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <SemanticForm.Field textAlign="right">
                                <Button
                                    size="huge"
                                    disabled={pristine || submitting}
                                    loading={submitting}
                                    type="submit"
                                    backgroundColor={CUTTY_SARK}
                                >
                                    Submit
                                </Button>
                            </SemanticForm.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Column width={3}>
                        <Error error={signUpErrorMessage} touched />
                    </Grid.Column>
                </Grid>
            </Form>
        );
    }
}

export default reduxForm({
    form: "signUpForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(SecondPage);
