import { createApp } from './main';

const prepareUrlForRouting = (url) => {
  const { BASE_URL } = process.env;
  return url.startsWith(BASE_URL.replace(/\/$/, ''))
    ? url.substr(BASE_URL.length)
    : url;
};

export default (context) => {
  /* eslint-disable-next-line no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    const { app, router } = await createApp();

    router.push(prepareUrlForRouting(context.url));

    router.onReady(() => {
      context.rendered = () => {};
      resolve(app);
    }, reject);
  });
};
