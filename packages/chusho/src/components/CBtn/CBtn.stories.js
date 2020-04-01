import StoryRouter from 'storybook-vue-router';
import CBtn from './CBtn';

export default {
  title: 'Components|Btn',
  component: CBtn,
  parameters: {
    componentSubtitle:
      'Uniformized button style for `router-link`, `nuxt-link`, `a` or `button` elements.',
    options: {
      componentConfig: [
        {
          name: 'defaultClass',
          type: { summary: 'string' },
          description: 'Class applied to all CBtn components.',
        },
        {
          name: 'disabledClass',
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
  decorators: [
    StoryRouter(
      {},
      {
        routes: [
          {
            path: '/',
            name: 'home',
            component: { template: `<div>Home</div>` },
          },
        ],
      }
    ),
  ],
};

export const Default = () => ({
  components: { CBtn },
  template: '<CBtn>Click me</CBtn>',
});

export const AsLink = () => ({
  components: { CBtn },
  template: '<CBtn href="#">Click me</CBtn>',
});

export const AsRouterLink = () => ({
  components: { CBtn },
  template: `<CBtn :to="{ name: 'home' }">Click me</CBtn>`,
});

export const TypeSubmit = () => ({
  components: { CBtn },
  template: '<CBtn type="submit">Click me</CBtn>',
});

export const WithVariant = () => ({
  components: { CBtn },
  template: '<CBtn variant="default medium">Click me</CBtn>',
});

export const Disabled = () => ({
  components: { CBtn },
  template: `<CBtn disabled>Click me</CBtn>`,
});

export const WithCustomClasses = () => ({
  components: { CBtn },
  template: `<CBtn class="font-bold">Click me</CBtn>`,
});
