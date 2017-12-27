import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Block from '../../Common/Styled/Block';
import Message from './Message';
import { remCalc } from '../../../common/helpers';
import InfiniteScroll from '../../../hoc/InfiniteScroll';

const Group = Comment.Group;

class Chat extends Component {
    static propTypes = {
        userRef: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired,
        newMessages: PropTypes.array.isRequired,
        onDeleteMessage: PropTypes.func.isRequired,
    };

    render() {
        const {
            userRef,
            data,
            newMessages,
            onDeleteMessage
        } = this.props;

        return (
            <Block mobileMinWidth={remCalc(300)} key="rooms-nav" margin={`0 0 ${remCalc(25)} 0`}>
                <Group>
                    <Divider/>
                    {data.map(o => <Message
                        key={o.messageRef}
                        messageRef={o.messageRef}
                        owner={parseInt(o.createdBy) === userRef}
                        username={o.username}
                        message={o.message}
                        avatar={o.avatar}
                        createdAt={o.createdAt}
                        deleteMessageLoading={o.deleteMessageLoading}
                        onDeleteMessage={onDeleteMessage}
                    />)}
                    {newMessages.map(o => <Message
                        key={o.messageRef}
                        messageRef={o.messageRef}
                        owner={parseInt(o.createdBy) === userRef}
                        username={o.username}
                        message={o.message}
                        avatar={o.avatar}
                        createdAt={o.createdAt}
                        deleteMessageLoading={o.deleteMessageLoading}
                        onDeleteMessage={onDeleteMessage}
                    />)}
                </Group>
            </Block>
        )
    }
}

export default InfiniteScroll(Chat);