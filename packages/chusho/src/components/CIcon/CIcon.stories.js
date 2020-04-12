import CIcon from './CIcon';

export default {
  title: 'Icon',
  component: CIcon,
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
