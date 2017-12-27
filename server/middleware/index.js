import utils from "./utils";
import client from "./client";
import security from "./security";

const middleware = [...utils, ...client, ...security];

export default middleware;
