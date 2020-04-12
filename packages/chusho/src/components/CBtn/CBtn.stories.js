import StoryRouter from 'storybook-vue-router';
import CBtn from './CBtn';

export default {
  title: 'Btn',
  component: CBtn,
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
