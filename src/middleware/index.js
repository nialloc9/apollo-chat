import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import history from './history';
import cache from './cache';
import brain from './brain';
import push from './push';

let middleware = [thunk, history, cache, brain, push];

//DEVELOPMENT ONLY
if (process.env.NODE_ENV === `development`) {

    const logger = createLogger({
        collapsed: true
    });

    middleware.push(logger);
}

export default applyMiddleware(...middleware);