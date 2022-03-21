import debounce from '../debounce';

afterAll(() => {
  jest.useRealTimers();
});

describe('debounce', () => {
  const time = 500;

  it('call the function only once after the given duration', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    const debounced = debounce(callback, time);

    debounced();
    debounced();

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('recall the function only once after the time has elapsed', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    const debounced = debounce(callback, time);

    debounced();
    debounced();

    jest.advanceTimersByTime(time);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('call the function only once immediately if requested', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    const debounced = debounce(callback, time, true);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('recall the function only once after the time has elapsed after immediate invocation ', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    const debounced = debounce(callback, time, true);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
