import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RoomTable from './RoomTable';
import withDisplay from '../../../hoc/withDisplay';

class ReactComponent extends Component {
    static propTypes = {
        onDeleteRoom: PropTypes.func.isRequired,
        onEditRoom: PropTypes.func.isRequired,
        editRoomErrorMessage: PropTypes.string,
        rooms: PropTypes.array,
    };

    static defaultProps = {
        rooms: [],
    };

    render() {
        const { editRoomErrorMessage, rooms, onDeleteRoom, onEditRoom } = this.props;

        return (
            <RoomTable
                myRoom={true}
                rooms={rooms}
                editRoomErrorMessage={editRoomErrorMessage}
                onEditRoom={onEditRoom}
                onDeleteRoom={onDeleteRoom}
            />
        )
    }
}

export default withDisplay(ReactComponent);