import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Grid } from 'semantic-ui-react';
import Block from '../../Common/Styled/Block';
import { Input, Form } from '../../Common/Form/index';
import { required, number, maxLength } from '../../Common/Form/rules';
import Button from '../../Common/Styled/Button';
import Header from '../../Common/Styled/Header';
import { remCalc } from '../../../common/helpers';
import { PUERTO_RICO } from '../../../common/style';

const maxLength30 = maxLength(30);

class JoinRoomForm extends PureComponent {

    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
    };

    static defaultProps = {
        errorMessage: ""
    };

    render(){
        const { pristine, errorMessage, loading, submitting, handleSubmit } = this.props;
        return (
            <Block margin={`${remCalc(16)} ${remCalc(100)}`} width="50%" mobileMargin="auto auto" mobileWidth="100%">
                <Form error={errorMessage} onSubmit={handleSubmit}>
                    <Grid stackable columns={1} stretched>
                        <Grid.Column>
                            <Header as="h3" color={PUERTO_RICO} margin={`auto auto ${remCalc(-20)} auto`}>Join room</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Field
                                name="roomPin"
                                type="text"
                                component={Input}
                                placeholder="PIN*"
                                validate={[required, number]}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Field
                                name="username"
                                type="text"
                                component={Input}
                                placeholder="Username*"
                                validate={[required, maxLength30]}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                disabled={pristine || submitting}
                                backgroundColor={PUERTO_RICO}
                                type="submit"
                                loading={loading}
                            >
                                Join
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </Block>
        );
    }
}

export default reduxForm({
    form: 'joinRoom'
})(JoinRoomForm);
