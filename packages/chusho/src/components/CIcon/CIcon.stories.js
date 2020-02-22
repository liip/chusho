import CIcon from './CIcon';

export default {
  title: 'Icon',
  component: CIcon,
  parameters: {
    componentSubtitle:
      'Display a scalable SVG icon from a pre-existing sprite.',
    options: {
      componentConfig: 'icon',
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
