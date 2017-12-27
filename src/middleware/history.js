import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();

const historyMiddleware = routerMiddleware(history);

export default historyMiddleware;