import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table as SemanticTable } from 'semantic-ui-react';
import Block from '../../Common/Styled/Block';
import RoomRow from './RoomRow';
import { Table, HeaderCell } from '../../Common/Styled/Table';
import Error from '../../Common/Form/Error';
import { remCalc } from '../../../common/helpers';
import { CUTTY_SARK } from '../../../common/style';

class RoomTable extends Component {
    static propTypes = {
        editRoomErrorMessage: PropTypes.string,
        myRoom: PropTypes.bool,
        rooms: PropTypes.array,
        onLeaveRoom: PropTypes.func,
        onEditRoom: PropTypes.func,
        onDeleteRoom: PropTypes.func,
    };

    static defaultProps = {
        myRoom: false,
        rooms: [],
        onEditRoom: null,
        onLeaveRoom: null,
        onDeleteRoom: null
    };

    render() {

        const { myRoom, editRoomErrorMessage, rooms, onEditRoom, onDeleteRoom, onLeaveRoom } = this.props;

        return (
            <Block mobileMinWidth={remCalc(300)} margin={`0 0 ${remCalc(20)} 0`}>
                <Error error={editRoomErrorMessage} touched={!!editRoomErrorMessage}/>
                <Table basic='very' celled collapsing>
                    <SemanticTable.Header>
                        <SemanticTable.Row>
                            <HeaderCell><Block color={CUTTY_SARK}>No</Block></HeaderCell>
                            <HeaderCell><Block color={CUTTY_SARK}>Name</Block></HeaderCell>
                            <HeaderCell><Block color={CUTTY_SARK}>Pin</Block></HeaderCell>
                            <HeaderCell><Block color={CUTTY_SARK}>Expires</Block></HeaderCell>
                            <HeaderCell><Block color={CUTTY_SARK}>Members</Block></HeaderCell>
                            <HeaderCell><Block color={CUTTY_SARK}>Created</Block></HeaderCell>
                            <HeaderCell/>
                        </SemanticTable.Row>
                    </SemanticTable.Header>
                    <SemanticTable.Body>
                        {
                            rooms.map((o, i) =>
                                <RoomRow
                                    myRoom={myRoom}
                                    index={i + 1}
                                    key={o.roomRef}
                                    name={o.roomName}
                                    roomRef={o.roomRef}
                                    roomPin={o.roomPin}
                                    members={o.members}
                                    created={o.createdAt}
                                    expire={o.expire}
                                    editRoomLoading={o.editRoomLoading}
                                    deleteRoomLoading={o.deleteRoomLoading}
                                    leaveRoomLoading={o.leaveRoomLoading}
                                    onEditRoom={onEditRoom}
                                    onLeaveRoom={onLeaveRoom}
                                    onDeleteRoom={onDeleteRoom}
                                />)
                        }
                    </SemanticTable.Body>
                </Table>
            </Block>
        )
    }
}

export default RoomTable;