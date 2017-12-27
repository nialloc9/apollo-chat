import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import Block from '../../Common/Styled/Block';
import CreateRoomForm from './CreateRoomForm';
import MessageBox from '../../Common/MessageBox';

class CreateRoom extends PureComponent {

    static propTypes = {
        createRoomPage: PropTypes.number.isRequired,
        onSetRoom: PropTypes.func.isRequired,
        onSetCreateRoomPage: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        errorMessage: "",
        loading: false
    };

    previousPage = () => {
        const { onSetCreateRoomPage } = this.props;
        onSetCreateRoomPage(0);
    };

    render() {
        const { errorMessage, loading, createRoomPage, onSetRoom } = this.props;

        return (
            <Block>
                {(createRoomPage === 0) && <CreateRoomForm
                    errorMessage={errorMessage}
                    loading={loading}
                    onSubmit={onSetRoom}
                />}
                {createRoomPage === 1 && <MessageBox onClick={this.previousPage} text="Room was successfully created."/>}
            </Block>
        );
    }
}

export default CreateRoom;
