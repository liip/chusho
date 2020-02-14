/**
 * Automatically snapshot all Storybook stories with Jest
 */

import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter,
} from '@storybook/addon-storyshots';

initStoryshots({
  configPath: 'config/storybook',
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotExtension: '.js.snap',
  }),
});
