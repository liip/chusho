import Btn from './Btn.vue';

export default {
  title: 'Btn',
  component: Btn,
};

export const Default = () => ({
  components: { Btn },
  template: '<Btn>Click me</Btn>',
});

export const AsLink = () => ({
  components: { Btn },
  template: '<Btn href="#">Click me</Btn>',
});

export const TypeSubmit = () => ({
  components: { Btn },
  template: '<Btn type="submit">Click me</Btn>',
});

export const WithVariant = () => ({
  components: { Btn },
  template: '<Btn variant="primary">Click me</Btn>',
});

export const WithMultipleVariants = () => ({
  components: { Btn },
  template: '<Btn variant="primary large">Click me</Btn>',
});

export const Block = () => ({
  components: { Btn },
  template: '<Btn variant="block">Click me</Btn>',
});

export const Disabled = () => ({
  components: { Btn },
  template: `<Btn disabled>Click me</Btn>`,
});

export const WithCustomClasses = () => ({
  components: { Btn },
  template: `<Btn class="font-bold">Click me</Btn>`,
});
