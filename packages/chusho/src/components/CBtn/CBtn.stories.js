import CBtn from './CBtn';

export default {
  title: 'Components|Btn',
  component: CBtn,
  parameters: {
    componentSubtitle: 'Uniformized button style for `a` or `button` elements.',
    options: {
      componentConfig: [
        {
          name: 'default',
          type: { summary: 'string' },
          description: 'Class applied to all Btn instances.',
        },
        {
          name: 'disabled',
          type: { summary: 'string' },
          description:
            'Class applied to Btn when prop `disabled` is set to `true`.',
        },
        {
          name: 'variants',
          type: { summary: 'object' },
          description:
            'Predefined set of variants.\n\nFor example: `{ "primary": "bg-blue-500 text-white" }`',
        },
      ],
    },
  },
};

export const Default = () => ({
  components: { CBtn },
  template: '<CBtn>Click me</CBtn>',
});

export const AsLink = () => ({
  components: { CBtn },
  template: '<CBtn href="#">Click me</CBtn>',
});

export const TypeSubmit = () => ({
  components: { CBtn },
  template: '<CBtn type="submit">Click me</CBtn>',
});

export const WithVariant = () => ({
  components: { CBtn },
  template: '<CBtn variant="primary">Click me</CBtn>',
});

export const WithMultipleVariants = () => ({
  components: { CBtn },
  template: '<CBtn variant="primary large">Click me</CBtn>',
});

export const Block = () => ({
  components: { CBtn },
  template: '<CBtn variant="block">Click me</CBtn>',
});

export const Disabled = () => ({
  components: { CBtn },
  template: `<CBtn disabled>Click me</CBtn>`,
});

export const WithCustomClasses = () => ({
  components: { CBtn },
  template: `<CBtn class="font-bold">Click me</CBtn>`,
});
