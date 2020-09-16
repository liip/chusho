import CAlert from './CAlert';

export default {
  title: 'Alert',
  component: CAlert,
};

export const Default = () => ({
  components: { CAlert },
  template: `
    <CAlert>
      This is a message.
    </CAlert>
  `,
});

export const WithVariant = () => ({
  components: { CAlert },
  template: `
    <CAlert variant="error">
      This is an error message you should probably care about.
    </CAlert>
  `,
});

export const WithMultipleVariants = () => ({
  components: { CAlert },
  template: `
    <CAlert variant="error inline">
      This is an inline error message you should probably care about.
    </CAlert>
  `,
});
