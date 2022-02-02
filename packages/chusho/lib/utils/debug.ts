// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export let warn = (msg: string): void => {};

if (process.env.NODE_ENV !== 'production') {
  warn = (msg: string): void => {
    // eslint-disable-next-line no-console
    console?.warn(`[Chūshō warn]: ${msg}`);
  };
}
