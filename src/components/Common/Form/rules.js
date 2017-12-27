import moment from "moment";

export const required = value => (value ? undefined : "Required");

export const minLength = min => value =>
    value && value.length < min
        ? `Must be ${min} characters or more`
        : undefined;

export const maxLength = max => value =>
    value && value.length > max
        ? `Must be ${max} characters or less`
        : undefined;

export const number = value =>
    value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;

export const maxValue = max => value =>
    value && value < max ? `Must be at most ${max}` : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : undefined;

export const isValidDate = value => {
    return !moment(value, "DD-MM-YYYY").isValid()
        ? "Must be DD-MM-YYYY"
        : undefined;
};

export const isWholeNumber = value =>
    value && value % 1 === 0 ? undefined : "Must be a whole number";

export default {
    required,
    maxLength,
    number,
    minValue,
    maxValue,
    email,
    isValidDate,
    isWholeNumber
};
