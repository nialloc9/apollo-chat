import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Block from '../../Common/Styled/Block';
import JoinRoomForm from './JoinRoomForm';
import MessageBox from '../../Common/MessageBox';

class JoinRoom extends PureComponent {

    static propTypes = {
        joinRoomPage: PropTypes.number.isRequired,
        onJoinRoom: PropTypes.func.isRequired,
        onSetJoinRoomPage: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        errorMessage: "",
        loading: false,
    };

    previousPage = () => {
        const { onSetJoinRoomPage } = this.props;
        onSetJoinRoomPage(0);
    };

    render() {
        const { errorMessage, loading, joinRoomPage, onJoinRoom } = this.props;

        return (
            <Block>
                {(joinRoomPage === 0) && <JoinRoomForm
                    errorMessage={errorMessage}
                    loading={loading}
                    onSubmit={onJoinRoom}
                />}
                {joinRoomPage === 1 && <MessageBox onClick={this.previousPage} text="Room joined. Please see other room's tab."/>}
            </Block>
        );
    }
}

export default JoinRoom;
