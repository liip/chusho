import React, { useContext } from 'react';
import { PropsTable } from '@storybook/components';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { Heading, DocsContext } from '@storybook/addon-docs/blocks';

export default () => {
  const context = useContext(DocsContext);
  const componentConfig = context.parameters.options.componentConfig;

  return componentConfig
    ? [
        React.createElement(Heading, { key: 'title' }, 'Component config'),
        React.createElement(
          styled.p(({ theme }) => ({
            fontSize: theme.typography.size.s2,
            color: transparentize(0.4, theme.color.defaultText),
          })),
          { key: 'desc' },
          `The following config applies to all ${context.kind
            .split('|')
            .pop()} instances accross your entire project.`
        ),
        React.createElement(PropsTable, {
          key: 'config',
          rows: componentConfig,
        }),
      ]
    : null;
};
