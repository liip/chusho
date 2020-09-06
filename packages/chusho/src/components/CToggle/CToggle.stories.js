import CToggle from './CToggle';
import CToggleBtn from './CToggleBtn';
import CToggleContent from './CToggleContent';

export default {
  title: 'Toggle',
  component: CToggle,
  subcomponents: { CToggleBtn, CToggleContent },
};

export const Default = () => ({
  components: { CToggle, CToggleBtn, CToggleContent },
  template: `<CToggle>
    <CToggleBtn variant="medium default" data-test="toggle-button">Toggle</CToggleBtn>
    <CToggleContent class="bg-gray-200 px-4 py-3 rounded mt-2" data-test="toggle-content">
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
    <CToggleBtn variant="medium default" data-test="toggle-button">{{ toggleOpen ? 'Close' : 'Open' }}</CToggleBtn>
    <CToggleContent class="bg-gray-200 px-4 py-3 rounded mt-2" data-test="toggle-content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
    </CToggleContent>
  </CToggle>`,
});
