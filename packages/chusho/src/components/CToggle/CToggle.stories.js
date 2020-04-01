import CToggle from './CToggle';
import CToggleBtn from './CToggleBtn';
import CToggleContent from './CToggleContent';

export default {
  title: 'Components|Toggle',
  component: CToggle,
  subcomponents: { CToggleBtn, CToggleContent },
  parameters: {
    componentSubtitle: 'Conditionnaly display some content.',
    options: {
      componentConfig: [
        {
          name: 'transition',
          type: { summary: 'object' },
          description:
            'Apply a common transition to all Toggles. The object can contain any Vue built-in [transition component props](https://vuejs.org/v2/api/#transition).\n\nFor example: `{ name: "fade", mode: "out-in" }`',
        },
      ],
    },
  },
};

export const Default = () => ({
  components: { CToggle, CToggleBtn, CToggleContent },
  template: `<CToggle>
    <CToggleBtn variant="medium default">Toggle</CToggleBtn>
    <CToggleContent class="bg-gray-200 px-4 py-3 rounded mt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
    </CToggleContent>
  </CToggle>`,
});

export const Controlled = () => ({
  components: { CToggle, CToggleBtn, CToggleContent },
  data() {
    return {
      toggleOpen: true,
    };
  },
  template: `<CToggle v-model="toggleOpen">
    <CToggleBtn variant="medium default">{{ toggleOpen ? 'Close' : 'Open' }}</CToggleBtn>
    <CToggleContent class="bg-gray-200 px-4 py-3 rounded mt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
    </CToggleContent>
  </CToggle>`,
});

Controlled.story = {
  parameters: {
    docs: {
      storyDescription:
        'You can control the Toggle status with the `v-model` directive, for example to make it open by default or to programatically change its state.',
    },
  },
};
