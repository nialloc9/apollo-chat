import React, {PureComponent} from 'react';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import PropTypes from 'prop-types';
import moment from 'moment';
import Block from '../../Common/Styled/Block';
import avatars from '../avatars';
import Loader from '../../../hoc/Loader';

const CommentAction = Comment.Action;
const LoaderAction = Loader(CommentAction);

class Message extends PureComponent {
    static propTypes = {
        owner: PropTypes.bool.isRequired,
        messageRef: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        onDeleteMessage: PropTypes.func.isRequired,
        deleteMessageLoading: PropTypes.bool,
    };

    static defaultProps = {
        deleteMessageLoading: false
    };

    handleDeleteClick = () => {
        const { messageRef, onDeleteMessage } = this.props;

        onDeleteMessage(messageRef);
    };

    render() {
        const {
            owner,
            username,
            message,
            avatar,
            createdAt,
            deleteMessageLoading
        } = this.props;

        return (
            <Comment>
                <Comment.Avatar src={avatars[avatar]} />
                <Comment.Content>
                    <Comment.Author>{username}</Comment.Author>
                    <Comment.Metadata>
                        <Block>{moment(createdAt).format('LLL')}</Block>
                    </Comment.Metadata>
                    <Comment.Text>{message}</Comment.Text>
                    {owner && <LoaderAction
                        loading={deleteMessageLoading}
                        onClick={this.handleDeleteClick}
                    ><Block
                        cursor="pointer"
                    >Delete</Block></LoaderAction>}
                </Comment.Content>
            </Comment>
        )
    }
}

export default Message;