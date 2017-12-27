import { BRAIN_INIT_REQUEST } from '../constants/brain';

/**
 * initializes the brain
 */
export const initBrain  = () => dispatch => {
    dispatch({
        type: BRAIN_INIT_REQUEST
    })
};