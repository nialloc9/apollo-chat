import moment from 'moment';

const createTimestamp = (timestamp, format = "DD/MM/YYYY") => timestamp ?
    moment(timestamp, format).format("DD/MM/YYYY hh:mm:ss") :
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss");

export default createTimestamp;