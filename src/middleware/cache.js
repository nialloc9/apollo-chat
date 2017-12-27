import { CACHE_MISS, CACHE_CLEAR, CACHE_HIT } from '../constants/cache';

/**
 * @param dispatch
 * @param getState
 * @constructor
 */
const cache = ({ dispatch, getState }) => next => (action) => {
    const { type, payload } = action;

    try {
        const { sessionStorage } = window;

        const index = payload ? payload.storeIndex : null;

        switch (type) {
            case CACHE_HIT:
                const cachedData = JSON.parse(sessionStorage.getItem(index));

                cachedData && dispatch(getCache(index, cachedData));
                break;

            case CACHE_MISS:

                const { storeIndex, ...data } = payload;

                sessionStorage.setItem(
                    index,
                    JSON.stringify({ ...data, lastUpdatedAt: Date.now() }),
                );
                break;

            case CACHE_CLEAR:
                sessionStorage.clear();
                break;

            default:
                return next(action);
        }
    } catch (error) {
        console.log(error);
    }

  return next(action);
};

/**
 * Sends the data
 * @param type
 * @param payload
 */
const getCache = (type, payload) => ({
  type,
  payload,
});

export default cache;
