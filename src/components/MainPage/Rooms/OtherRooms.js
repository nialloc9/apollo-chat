import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RoomTable from './RoomTable';
import withDisplay from '../../../hoc/withDisplay';

class OtherRooms extends Component {
    static propTypes = {
        rooms: PropTypes.array,
        onEnterRoom: PropTypes.func.isRequired,
        onLeaveRoom: PropTypes.func.isRequired,
    };

    static defaultProps = {
        rooms: [],
    };

    render() {
        const { rooms, onEnterRoom, onLeaveRoom } = this.props;

        return (
            <RoomTable
                rooms={rooms}
                onEnterRoom={onEnterRoom}
                onLeaveRoom={onLeaveRoom}
            />
        )
    }
}

export default withDisplay(OtherRooms);