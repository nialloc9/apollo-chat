import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Block from '../../Common/Styled/Block'
import MyRooms from './MyRooms';
import OtherRooms from './OtherRooms';
import { Menu } from '../../Common/Styled/Menu'
import TabItem from './TabItem';
import { remCalc } from '../../../common/helpers';

class Rooms extends Component {
    static propTypes = {
        userRef: PropTypes.number.isRequired,
        editRoomUsername: PropTypes.string.isRequired,
        onDeleteRoom: PropTypes.func.isRequired,
        onEditRoom: PropTypes.func.isRequired,
        onLeaveRoom: PropTypes.func.isRequired,
        editRoomErrorMessage: PropTypes.string,
        rooms: PropTypes.array
    };

    state = { selectedItem: "myRooms" };

    static defaultProps = {
        numberOfRooms: 3,
        rooms: []
    };

    componentWillMount(){
        this.handleRoomFilter(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.handleRoomFilter(nextProps);
    };

    handleSelectedItem = (selectedItem) => {
        this.setState({
            selectedItem
        });
    };

    handleRoomFilter = (props) => {
        const { userRef, rooms } = props;

        let myRooms = [];
        let otherRooms = [];

        rooms.map(o => {
            parseInt(o.createdBy) === userRef ? myRooms.push(o) : otherRooms.push(o);
        });

        this.myRooms = myRooms;
        this.otherRooms = otherRooms;
    };

    render() {
        const { selectedItem } = this.state;

        const { editRoomErrorMessage, onDeleteRoom, onEditRoom, onLeaveRoom } = this.props;
        return [
            <Block mobileMinWidth={remCalc(300)} key="rooms-nav" margin={`0 0 ${remCalc(25)} 0`}>
                <Menu tabular size="huge">
                    <TabItem
                        name="My Rooms"
                        item="myRooms"
                        selectedItem={selectedItem}
                        handleSelectedItem={this.handleSelectedItem}
                    />
                    <TabItem
                        name="Other Rooms"
                        item="otherRooms"
                        selectedItem={selectedItem}
                        handleSelectedItem={this.handleSelectedItem}
                    />
                </Menu>
            </Block>,
            <MyRooms
                key="my-rooms-table"
                editRoomErrorMessage={editRoomErrorMessage}
                display={selectedItem === "myRooms"}
                rooms={this.myRooms}
                onEditRoom={onEditRoom}
                onDeleteRoom={onDeleteRoom}
            />,
            <OtherRooms
                key="other-rooms-table"
                display={selectedItem === "otherRooms"}
                rooms={this.otherRooms}
                onLeaveRoom={onLeaveRoom}
            />,
        ]
    }
}

export default Rooms;