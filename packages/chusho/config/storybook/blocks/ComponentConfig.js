import React, { useContext } from 'react';
import { Heading, Source, DocsContext } from '@storybook/addon-docs/blocks';

import { defaultOptions } from '@/main';

export default () => {
  const context = useContext(DocsContext);
  const code = JSON.stringify(
    defaultOptions[context.parameters.options.componentConfig],
    null,
    4
  );

  return code
    ? [
        React.createElement(Heading, { key: 'title' }, 'Component config'),
        React.createElement(Source, {
          key: 'code',
          language: 'json',
          dark: true,
          code,
        }),
      ]
    : null;
};
