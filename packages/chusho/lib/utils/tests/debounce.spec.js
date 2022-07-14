import debounce from '../debounce';

afterAll(() => {
  vi.useRealTimers();
});

describe('debounce', () => {
  const time = 500;

  it('call the function only once after the given duration', () => {
    vi.useFakeTimers();

    const callback = vi.fn();

    const debounced = debounce(callback, time);

    debounced();
    debounced();

    expect(callback).not.toBeCalled();

    vi.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('recall the function only once after the time has elapsed', () => {
    vi.useFakeTimers();

    const callback = vi.fn();

    const debounced = debounce(callback, time);

    debounced();
    debounced();

    vi.advanceTimersByTime(time);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('call the function only once immediately if requested', () => {
    vi.useFakeTimers();

    const callback = vi.fn();

    const debounced = debounce(callback, time, true);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('recall the function only once after the time has elapsed after immediate invocation ', () => {
    vi.useFakeTimers();

    const callback = vi.fn();

    const debounced = debounce(callback, time, true);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(time);

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
