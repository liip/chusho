import CBtn from './CBtn';

export default {
  title: 'Btn',
  component: CBtn,
  parameters: {
    componentSubtitle: 'Uniformized button style for `a` or `button` elements.',
    options: {
      componentConfig: 'btn',
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
