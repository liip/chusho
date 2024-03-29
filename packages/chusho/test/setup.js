import uid, { reset } from '../lib/utils/uid';

/*----------------------------------------*\
  Spy on console.warn to assert on it
\*----------------------------------------*/

expect.extend({
  toHaveBeenWarned(received) {
    asserted.add(received);

    const passed = warn.mock.calls.some(
      (args) => args[0].indexOf(received) > -1
    );

    if (passed) {
      return {
        pass: true,
        message: () => `expected "${received}" not to have been warned.`,
      };
    } else {
      const msgs = warn.mock.calls.map((args) => args[0]).join('\n - ');
      return {
        pass: false,
        message: () =>
          `expected "${received}" to have been warned.\n\nActual messages:\n\n - ${msgs}`,
      };
    }
  },
});

let warn;
const asserted = new Set();

beforeEach(() => {
  asserted.clear();
  warn = vi.spyOn(console, 'warn');
  warn.mockImplementation(() => {
    // noop
  });
});

afterEach(() => {
  const assertedArray = Array.from(asserted);
  const nonAssertedWarnings = warn.mock.calls
    .map((args) => args[0])
    .filter((received) => {
      return !assertedArray.some((assertedMsg) => {
        return received.indexOf(assertedMsg) > -1;
      });
    });
  warn.mockRestore();
  if (nonAssertedWarnings.length) {
    nonAssertedWarnings.forEach((warning) => {
      // eslint-disable-next-line no-console
      console.error(warning);
    });
  }
});

/*----------------------------------------*\
  Keep the same UID sequence for each test
\*----------------------------------------*/

vi.mock('../lib/utils/uid');

afterEach(() => {
  uid.mockClear();
  reset();
});
