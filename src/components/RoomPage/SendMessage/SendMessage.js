import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Block from '../../Common/Styled/Block'
import Button from '../../Common/Styled/Button';
import Form from '../../Common/Form/Form';
import TextArea from '../../Common/Form/TextArea';
import { required, maxLength } from '../../Common/Form/rules';
import { remCalc } from '../../../common/helpers';

const maxLength400 = maxLength(400);

class SendMessage extends Component {
    static propTypes = {
        hasMessages: PropTypes.bool.isRequired,
        pristine: PropTypes.bool.isRequired,
        messageCreateLoading: PropTypes.bool.isRequired,
        messageCreateErrorMessage: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    render() {
        const {
            pristine,
            messageCreateLoading,
            messageCreateErrorMessage,
            hasMessages,
            handleSubmit
        } = this.props;

        return (
            <Block margin={`${remCalc(15)} auto auto auto`}>
                <Form error={messageCreateErrorMessage} onSubmit={handleSubmit}>
                    <Block margin={`${remCalc(15)} auto auto auto`}>
                        <Field
                            name="message"
                            autoHeight
                            component={TextArea}
                            placeholder="Add message here..."
                            validate={[required, maxLength400]}
                        />
                    </Block>
                    <Block margin={`${remCalc(15)} auto auto auto`}>
                        <Button
                            content={hasMessages ? 'Reply' : 'Send message'}
                            labelPosition='left'
                            icon='send'
                            loading={messageCreateLoading}
                            disabled={pristine || messageCreateLoading}
                            type="submit"
                        />
                    </Block>
                </Form>
            </Block>
        )
    }
}

export default reduxForm({
    form: "sendMessageForm",
    destroyOnUnmount: true
})(SendMessage);