import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Cell } from '../../Common/Styled/Table';
import Icon from '../../Common/Styled/Icon';
import Block from '../../Common/Styled/Block';
import Input from '../../Common/Styled/Input';
import Actions from './Actions';
import { remCalc } from '../../../common/helpers';
import Loader from '../../../hoc/Loader';

const LoaderInput = Loader(Input);
const LoaderIcon = Loader(Icon);

class RoomRow extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        expire: PropTypes.string.isRequired,
        roomRef: PropTypes.number.isRequired,
        roomPin: PropTypes.number.isRequired,
        members: PropTypes.number.isRequired,
        created: PropTypes.number.isRequired,
        myRoom: PropTypes.bool,
        editRoomLoading: PropTypes.bool,
        leaveRoomLoading: PropTypes.bool,
        deleteRoomLoading: PropTypes.bool,
        onLeaveRoom: PropTypes.func,
        onDeleteRoom: PropTypes.func,
        onEditRoom: PropTypes.func,
    };

    static defaultProps = {
        myRoom: false,
        deleteRoomLoading: false,
        leaveRoomLoading: false,
        editRoomLoading: false,
        onLeaveRoom: null,
        onDeleteRoom: null,
        onEditRoom: null,
    };

    state = {
        editOpen: false,
        editRoomName: ""
    };

    handleEditRoomIconClick = () => {
        const { editOpen } = this.state;

        this.setState({
            editOpen: !editOpen
        })
    };

    handleEditRoomSaveClick = () => {
        const { roomRef, name, editRoomLoading, onEditRoom } = this.props;
        const { editRoomName } = this.state;

        if(editRoomName && editRoomName !== "" && !editRoomLoading && editRoomName !== name){
            onEditRoom({
                roomRef,
                roomName: editRoomName
            });
        }
    };

    handleNameOnChange = (e) => {
        const { target: { value } } = e;

        this.setState({
            editRoomName: value
        })
    }

    handleLeaveRoom = () => {
        const { roomRef, onLeaveRoom } = this.props;
        onLeaveRoom(roomRef);
    };

    handleDeleteRoom = () => {
        const { roomRef, onDeleteRoom } = this.props;
        onDeleteRoom(roomRef);
    };

    render(){
        const {
            index,
            expire,
            name,
            roomRef,
            roomPin,
            members,
            created,
            myRoom,
            deleteRoomLoading,
            leaveRoomLoading,
            editRoomLoading
        } = this.props;

        const { editOpen } = this.state;

        return(
            <Table.Row
                key={`room-row-${roomRef}`}
            >
                <Cell>
                    {index}
                </Cell>
                <Cell>
                    {!editOpen ? name :
                        <LoaderInput
                            defaultValue={name}
                            size="mini"
                            loading={editRoomLoading}
                            maxHorizontalTabletWroomRefth={remCalc(120)}
                            mobileMaxWroomRefth="none"
                            onChange={this.handleNameOnChange}
                        />}
                </Cell>
                <Cell>
                    {roomPin}
                </Cell>
                <Cell>
                    {moment(expire, `DD/MM/YYYY HH:mm:ss`).format('LLL')}
                </Cell>
                <Cell>
                    {members}
                </Cell>
                <Cell>
                    {moment(created).format('L')}
                </Cell>
                <Cell>
                    {
                        !editOpen ?
                            <Actions
                                myRoom={myRoom}
                                roomRef={roomRef}
                                name={name}
                                deleteRoomLoading={deleteRoomLoading}
                                leaveRoomLoading={leaveRoomLoading}
                                onEditRoomIconClick={this.handleEditRoomIconClick}
                                onLeaveRoom={this.handleLeaveRoom}
                                onDeleteRoom={this.handleDeleteRoom}
                            /> :
                            <Block>
                                <LoaderIcon
                                    name="check"
                                    cursor="pointer"
                                    loading={editRoomLoading}
                                    onClick={this.handleEditRoomSaveClick}
                                />
                                <Icon
                                    name="delete"
                                    cursor="pointer"
                                    onClick={this.handleEditRoomIconClick}
                                />
                            </Block>
                    }
                </Cell>
            </Table.Row>
        )
    }
}

export default RoomRow;