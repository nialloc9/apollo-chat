import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Grid, Form as SemanticForm } from "semantic-ui-react";
import Button from "../../Common/Styled/Button";
import Block from "../../Common/Styled/Block";
import { Input, Form, Error } from "../../Common/Form";
import { required, email } from "../../Common/Form/rules";
import { CUTTY_SARK, SLATE_GRAY } from '../../../common/style';
import { remCalc } from '../../../common/helpers';

class FirstPage extends PureComponent {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onLoginClick: PropTypes.func.isRequired,
        signUpErrorMessage: PropTypes.string,
    };

    static defaultProps = {
        signUpErrorMessage: ""
    };

    render() {
        const { pristine, submitting, handleSubmit, signUpErrorMessage, onLoginClick } = this.props;

        return (
            <Form
                onSubmit={handleSubmit}
            >
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column computer={5}>
                            <Block backgroundColor={CUTTY_SARK} opacity="0.7" padding={remCalc(30)}>
                                <Field
                                    name="email"
                                    size="huge"
                                    type="text"
                                    placeholder="Enter an email to get started"
                                    maxLength={40}
                                    component={Input}
                                    validate={[required, email]}
                                />
                            </Block>
                            <Block
                                margin={`${remCalc(10)} auto ${remCalc(-15)} auto`}
                                textAlign="center"
                            >
                                {`Or `}
                                <Block
                                    cursor="pointer"
                                    display="inline-block"
                                    textDecoration="underline"
                                    hoverColor={SLATE_GRAY}
                                    onClick={onLoginClick}
                                >click here
                                </Block> to login
                            </Block>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <SemanticForm.Field>
                                <Button
                                    size="huge"
                                    disabled={pristine || submitting}
                                    loading={submitting}
                                    type="submit"
                                    backgroundColor={CUTTY_SARK}
                                >
                                    Next
                                </Button>
                            </SemanticForm.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Error error={signUpErrorMessage} touched />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

export default reduxForm({
    form: "signUpForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FirstPage);
