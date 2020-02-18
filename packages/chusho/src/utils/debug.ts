export function warn(message: string): void {
  if (process.env.NODE_ENV !== 'production' && typeof 'console' !== undefined) {
    /* eslint-disable no-console */
    console.error(`[Chūchō warn] ${message}`);
  }
}
