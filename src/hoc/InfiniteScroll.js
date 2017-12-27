import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Infinite from "react-infinite-scroller";
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Block from '../components/Common/Styled/Block';
import { remCalc } from '../common/helpers';

const InfiniteScroll = WrappedComponent =>
    class InfiniteScroll extends Component {
        static propTypes = {
            total: PropTypes.number.isRequired,
            data: PropTypes.array.isRequired,
            onLoadMore: PropTypes.func.isRequired,
            maxHeight: PropTypes.number,
            offset: PropTypes.number,
            useWindow: PropTypes.bool,
            isReverse: PropTypes.bool,
        };

        static defaultProps = {
            maxHeight: 500,
            offset: 15,
            useWindow: false,
            isReverse: false,
        };

        componentDidMount() {

            const { isReverse } = this.props;

            if(isReverse){
                this.updateScroll();
            }
        }


        componentDidUpdate() {
            this.updateScroll();
        }

        updateScroll = () =>{
            const { isReverse, offset } = this.props;

            if(isReverse){
                const element = document.getElementById("infiniteBlock");

                const multiplier = offset > 40 ? 50 : 0;

                element.scrollTop = element.scrollHeight - (offset * multiplier);
            }
        };

        render() {
            const {
                maxHeight,
                offset,
                total,
                useWindow,
                isReverse,
                data,
                onLoadMore,
                ...rest
            } = this.props;

            const newData = offset < total ? data.slice(0, offset) : data.slice(0, total);

            const hasMore = offset < total;

            return (
                <Block
                    maxHeight={remCalc(maxHeight)}
                    overflow="auto"
                    id="infiniteBlock"
                >
                    <Infinite
                        id="infinite"
                        hasMore={hasMore}
                        useWindow={useWindow}
                        isReverse={isReverse}
                        loadMore={onLoadMore}
                        loader={<Block height={remCalc(70)}><Loader active inline /></Block>}
                    >
                        {
                            <WrappedComponent data={newData} total={total} {...rest} />
                        }
                    </Infinite>
                </Block>
            );
        }
    };

export default InfiniteScroll;