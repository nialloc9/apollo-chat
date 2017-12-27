import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Item } from '../../Common/Styled/Menu';
import { PUERTO_RICO } from '../../../common/style';
import { remCalc } from '../../../common/helpers';

class TabItem extends PureComponent {
    static propTypes = {
        item: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selectedItem: PropTypes.string.isRequired,
        handleSelectedItem: PropTypes.func.isRequired,
        event: PropTypes.string
    };

    handleClick = e => {
        e.preventDefault();
        const { item, handleSelectedItem } = this.props;
        handleSelectedItem(item)
    };

    render(){
        const {
            item,
            name,
            event,
            selectedItem
        } = this.props;

        return (
            <Item
                backgroundColor={item !== selectedItem ? "white" : PUERTO_RICO}
                textColor={item === selectedItem ? "white" : PUERTO_RICO}
                mobileDisplay="inline-block"
                borderRadius={`${remCalc(6)} ${remCalc(6)} 0 0`}
                fontSize={14}
                margin={`0 ${remCalc(10)} 0 0`}
                name={name}
                active={item !== selectedItem}
                event={event}
                onClick={this.handleClick}
            />
        )
    }
}

export default TabItem;
