import CStack from './CStack';
import CBtn from '../CBtn';

export default {
  title: 'Components|Stack',
  component: CStack,
  parameters: {
    componentSubtitle:
      'Automatically stack child components with configurable gap between each item.',
    options: {
      componentConfig: [
        {
          name: 'gaps',
          type: { summary: 'object' },
          description:
            'List of available gaps.\n\nFor example: `{ "1": { "containerClass": "-mt-1", "itemClass": "mt-1" } }`',
        },
      ],
    },
  },
};

export const Default = () => ({
  components: { CStack },
  template: `<CStack gap="1">
    <span>One</span>
    Two
    <span>Three</span>
  </CStack>`,
});

export const WithCustomTags = () => ({
  components: { CStack },
  template: `<CStack gap="2" containerTag="ul" itemTag="li">
    <span>One</span>
    Two
    <span>Three</span>
  </CStack>`,
});

export const WithSubComponent = () => ({
  components: { CStack, CBtn },
  template: `<CStack gap="2">
    <span>One</span>
    <CBtn>Two</CBtn>
    <span>Three</span>
  </CStack>`,
});
