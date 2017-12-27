import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Confirmation from '../../Common/Confirmation';
import Icon from '../../Common/Styled/Icon';
import Block from '../../Common/Styled/Block';
import { PUERTO_RICO } from '../../../common/style';
import Loader from '../../../hoc/Loader';

const LoadingIcon = Loader(Icon);

class Actions extends PureComponent {
    static propTypes = {
        myRoom: PropTypes.bool.isRequired,
        roomRef: PropTypes.number.isRequired,
        deleteRoomLoading: PropTypes.bool.isRequired,
        leaveRoomLoading: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        onEditRoomIconClick: PropTypes.func.isRequired,
        onLeaveRoom: PropTypes.func.isRequired,
        onDeleteRoom: PropTypes.func.isRequired,
    };

    state = {
        deleteOpen: false
    };

    handleEnterRoomClick = () => {
        const { roomRef, history } = this.props;

        history.push(`/room/${roomRef}`)
    };

    handleDeleteOpen = () => {
        const { deleteOpen } = this.state;

        this.setState({
            deleteOpen: !deleteOpen
        });
    };

    handleDeleteRoom = () => {
        const { onDeleteRoom } = this.props;

        this.handleDeleteOpen();
        onDeleteRoom();
    };

    render() {
        const {
            myRoom,
            name,
            deleteRoomLoading,
            leaveRoomLoading,
            onEditRoomIconClick,
            onLeaveRoom
        } = this.props;

        const { deleteOpen } = this.state;

        return [
            <Block
                key="room-actions-block"
            >
                <Icon
                    color={PUERTO_RICO}
                    name="sign in"
                    cursor="pointer"
                    onClick={this.handleEnterRoomClick}
                />
                {
                    !myRoom ?
                        [
                            <LoadingIcon
                                loading={leaveRoomLoading}
                                name="delete"
                                cursor="pointer"
                                onClick={onLeaveRoom}
                            />
                        ] :
                        [
                            <Icon
                                name="edit"
                                cursor="pointer"
                                onClick={onEditRoomIconClick}
                            />,
                            <LoadingIcon
                                loading={deleteRoomLoading}
                                cursor="pointer"
                                name="delete"
                                onClick={this.handleDeleteOpen}
                            />
                        ]
                }
            </Block>,
            <Confirmation
                key="handleDeleteConfirmation"
                text={`Are you sure you want to delete ${name}?`}
                open={deleteOpen}
                onModalCancel={this.handleDeleteOpen}
                onModalSuccess={this.handleDeleteRoom}
            />,
        ]
    }
}

export default withRouter(Actions);