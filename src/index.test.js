const { sum, isEquals } = require('./index');

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds -1 + 2 to equal 1', () => {
    expect(sum(-1, 2)).toBe(1);
  });

  test('adds -1 + -2 to equal -3', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});

describe('isEquals function', () => {
  test('checks if 1 is equal to 1', () => {
    expect(isEquals(1, 1)).toBe(true);
  });

  test('checks if 1 is not equal to 2', () => {
    expect(isEquals(1, 2)).toBe(false);
  });
});