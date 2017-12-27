/**
 * generates a random number between 100000 and 900000
 * @param min
 * @param max
 */
const generateRandomNumber = (min = 100000, max = 900000) => Math.floor(Math.random() * max) + min;

export default generateRandomNumber;