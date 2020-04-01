import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

export default {
  title: 'Components/Tabs',
  component: CTabs,
  subcomponents: { CTabList, CTab, CTabPanels, CTabPanel },
  parameters: {
    componentSubtitle: 'Accessible tabs component',
    options: {
      componentConfig: [
        {
          name: 'tabsClass',
          type: { summary: 'string' },
          description: 'Class applied to all CTabs components.',
        },
        {
          name: 'tabListClass',
          type: { summary: 'string' },
          description: 'Class applied to all CTabList components.',
        },
        {
          name: 'tabPanelsClass',
          type: { summary: 'string' },
          description: 'Class applied to all CTabPanels components.',
        },
        {
          name: 'tabPanelClass',
          type: {
            summary: 'string | function',
            detail: `// Example returning an object with conditional classes
function(active) {
  return {
    'tab-panel': true,
    'tab-panel--active': active
  }
}`,
          },
          description:
            'Class applied to all CTabPanel components.\n\nProvide a `function` to dynamically apply classes based on the state, in this case it should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).',
        },
        {
          name: 'tabClass',
          type: {
            summary: 'string | function',
            detail: `// Example returning an object with conditional classes
function(active) {
  return {
    'tab': true,
    'tab--active': active
  }
}`,
          },
          description:
            'Class applied to all CTab components.\n\nProvide a `function` to dynamically apply classes based on the state, in this case it should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).',
        },
      ],
    },
  },
};

export const Default = () => ({
  components: { CTabs, CTabList, CTab, CTabPanels, CTabPanel },
  template: `
    <CTabs>
      <CTabList aria-label="Example of tabs">
        <CTab target="1">Tab 1</CTab>
        <CTab target="2">Tab 2</CTab>
        <CTab target="3">Tab 3</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel id="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2">
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3">
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
        <CTab target="1">Tab 1</CTab>
        <CTab target="2">Tab 2</CTab>
        <CTab target="3">Tab 3</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel id="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2">
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3">
          Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  `,
});

Controlled.story = {
  parameters: {
    docs: {
      storyDescription:
        'You can optionally control wich Tab is active with the `v-model` directive.',
    },
  },
};

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
      <CTabList aria-label="Example of tabs with different style" class="flex justify-center mb-3" bare>
        <CTab target="1" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 1</CTab>
        <CTab target="2" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 2</CTab>
        <CTab target="3" :classGenerator="getTabClass" class="py-2 px-5 rounded-full" bare>Tab 3</CTab>
      </CTabList>

      <CTabPanels>
        <CTabPanel id="1" bare>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab.
        </CTabPanel>
        <CTabPanel id="2" bare>
          Nobis fuga cupiditate suscipit blanditiis, aliquid minima harum molestias pariatur tempora ab, libero quo maiores sapiente doloribus nihil commodi eaque accusantium praesentium! Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
        <CTabPanel id="3" bare>
          Laboriosam in, iste id nobis dolor excepturi dolore expedita vero quae. Nobis natus qui voluptate inventore molestias quisquam, consequuntur harum?
        </CTabPanel>
      </CTabPanels>
    </CTabs>
  `,
});

OverrideStyle.story = {
  parameters: {
    docs: {
      storyDescription:
        'Use the `bare` prop on any component to remove the class inherited from the config and create different styles from scratch.',
    },
  },
};
