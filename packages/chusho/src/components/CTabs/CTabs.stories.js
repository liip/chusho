import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

export default {
  title: 'Tabs',
  component: CTabs,
  subcomponents: { CTabList, CTab, CTabPanels, CTabPanel },
};

export const Default = () => ({
  components: { CTabs, CTabList, CTab, CTabPanels, CTabPanel },
  template: `
    <CTabs data-test="tabs">
      <CTabList aria-label="Example of tabs" data-test="tablist">
        <CTab target="1" data-test="tab-1">Tab 1</CTab>
        <CTab target="2" data-test="tab-2">Tab 2</CTab>
        <CTab target="3" data-test="tab-3">Tab 3</CTab>
      </CTabList>

      <CTabPanels data-test="tabpanels">
        <CTabPanel id="1" data-test="tabpanel-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2" data-test="tabpanel-2">
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3" data-test="tabpanel-3">
          Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  `,
});

export const Controlled = () => ({
  components: { CTabs, CTabList, CTab, CTabPanels, CTabPanel },
  data() {
    return {
      currentTab: '2',
    };
  },
  template: `
    <CTabs v-model="currentTab">
      <CTabList aria-label="Example of controlled tabs">
        <CTab target="1" data-test="tab-1">Tab 1</CTab>
        <CTab target="2" data-test="tab-2">Tab 2</CTab>
        <CTab target="3" data-test="tab-3">Tab 3</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel id="1" data-test="tabpanel-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2" data-test="tabpanel-2">
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3" data-test="tabpanel-3">
          Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  `,
});

export const OverrideStyle = () => ({
  components: { CTabs, CTabList, CTab, CTabPanels, CTabPanel },

  methods: {
    getTabClass(active) {
      return {
        'text-red-700': !active,
        'text-white font-semibold bg-red-700': active,
      };
    },
  },

  template: `
    <CTabs defaultTab="3">
      <CTabList data-test="tablist" aria-label="Example of tabs with different style" class="flex justify-center mb-3" bare>
        <CTab target="1" data-test="tab-1" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 1</CTab>
        <CTab target="2" data-test="tab-2" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 2</CTab>
        <CTab target="3" data-test="tab-3" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 3</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel id="1" data-test="tabpanel-1" bare>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2" data-test="tabpanel-2" bare>
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3" data-test="tabpanel-3" bare>
          Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  `,
});
