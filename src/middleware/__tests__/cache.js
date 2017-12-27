import cacheMiddleware from '../cache';

const doDispatch = jest.fn();
const doGetState = jest.fn();
const next = jest.fn();

const nextHandler = cacheMiddleware({
  dispatch: doDispatch,
  getState: doGetState,
});

describe('cacheMiddleware returns a function', () => {
  it('must return a function to handle next', () => {
    expect(JSON.stringify(nextHandler)).toEqual(JSON.stringify(next));
  });
});

describe('handle action', () => {
  it('must pass action to next if not a function', (done) => {
    const actionObj = {};

    const actionHandler = nextHandler((action) => {
      expect(action).toEqual(actionObj);
      done();
    });

    actionHandler(actionObj);
  });

  it('must return value as expected if a function', () => {
    const expected = 'rocks';
    const actionHandler = nextHandler(() => 'rocks');

    const outcome = actionHandler(e => e);
    expect(outcome).toEqual(expected);
  });
});
