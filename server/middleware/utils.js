import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


const utils = [
    logger("dev"),
    bodyParser.json(),
    cookieParser()
];

export default utils;