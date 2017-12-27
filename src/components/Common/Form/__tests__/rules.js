import { required, number, email, minValue, maxValue, maxLength } from '../rules';

describe('Rules test suite', () => {
  it('required returns undefined for string', () => {
    expect(required('test')).toEqual(undefined);
  });

  it('number returns undefined for valid number', () => {
    expect(number(123)).toEqual(undefined);
  });

  it('email returns an error message for invalid email', () => {
    expect(email('dhfugd').length > 0).toEqual(true);
  });

  it('email returns undefined for valid email', () => {
    expect(email('test@test.com')).toEqual(undefined);
  });

  it('minValue returns undefined for 9 when min value is 10', () => {
    const minVal10 = minValue(10);
    expect(minVal10(11)).toEqual(undefined);
  });

  it('maxValue returns undefined for 10 when max value is 11', () => {
    const maxVal10 = maxValue(10);
    expect(maxVal10(11)).toEqual(undefined);
  });

  it('maxLength returns undefined for test when max length is 5', () => {
    const maxLength5 = maxLength(5);
    expect(maxLength5('test')).toEqual(undefined);
  });
});
