import moment from 'moment';

/**
 * returns true if within date
 * @param date
 * @param days
 * @returns {boolean}
 */
export const withinFutureDays = (date, days = 3) => {
    const reference = moment(date, "DD/MM/YYYY");

    const withInDate = moment().add(days, 'days').endOf('day');

    return reference.isBefore(withInDate) && reference.isAfter(moment());
};

/**
 * returns true if same day
 * @param date
 * @returns {boolean}
 */
export const isToday = date => {

    const reference = moment(date, "DD/MM/YYYY");

    const today = moment().clone().startOf('day');

    return reference.isSame(today, 'd');
};