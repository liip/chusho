import CIcon from './CIcon';

export default {
  title: 'Components|Icon',
  component: CIcon,
  parameters: {
    componentSubtitle:
      'Display a scalable SVG icon from a pre-existing sprite.',
    options: {
      componentConfig: [
        {
          name: 'spriteUrl',
          type: { summary: 'string' },
          description:
            'Load the sprite from a remote URL. This technique doesn’t work on Internet Explorer, but it can be polyfilled with [svgxuse](https://github.com/Keyamoon/svgxuse). Learn more about [SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) on CSS-Tricks.',
        },
        {
          name: 'width',
          type: { summary: 'number' },
          description: 'Icon viewBox width.',
          defaultValue: { summary: 24 },
          required: true,
        },
        {
          name: 'height',
          type: { summary: 'number' },
          description: 'Icon viewBox height.',
          defaultValue: { summary: 24 },
          required: true,
        },
        {
          name: 'class',
          type: { summary: 'string' },
          description: 'Class applied to all Icon instances.',
        },
      ],
    },
  },
};

export const Default = () => ({
  components: { CIcon },
  template: `<CIcon id="palette" />`,
});

export const CustomScale = () => ({
  components: { CIcon },
  template: `<CIcon id="picture" :scale="0.5" />`,
});

export const WithAlternateText = () => ({
  components: { CIcon },
  template: `<CIcon id="picture" alt="Zoom picture" />`,
});
