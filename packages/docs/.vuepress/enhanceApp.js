import CompositionApi from '@vue/composition-api';
import Chusho, {
  CAlert,
  CBtn,
  CDialog,
  CIcon,
  CTab,
  CTabList,
  CTabPanel,
  CTabPanels,
  CTabs,
  CToggle,
  CToggleBtn,
  CToggleContent,
} from 'chusho';

import './assets/extras.scss';

export default ({ Vue }) => {
  Vue.use(CompositionApi);
  Vue.use(Chusho, {
    components: {
      btn: {
        defaultClass: 'btn',
        variants: {
          default: 'btn--default',
          medium: 'btn--medium',
        },
      },
      icon: {
        spriteUrl: '/icons.svg',
        width: 48,
        height: 48,
        class: 'icon',
      },
      tabs: {
        tabsClass: 'tabs',
        tabListClass: 'tablist',
        tabClass(active) {
          return [
            'tab btn',
            {
              'is-active': active,
            },
          ];
        },
      },
      dialog: {
        overlayClass: 'dialog-overlay',
        dialogClass: 'dialog',
      },
      alert: {
        defaultClass: 'alert',
        variants: {
          error: 'alert--error',
          warning: 'alert--warning',
          inline: 'alert--inline',
        },
      },
    },
  });

  Vue.component('CAlert', CAlert);
  Vue.component('CBtn', CBtn);
  Vue.component('CDialog', CDialog);
  Vue.component('CIcon', CIcon);
  Vue.component('CTab', CTab);
  Vue.component('CTabList', CTabList);
  Vue.component('CTabPanel', CTabPanel);
  Vue.component('CTabPanels', CTabPanels);
  Vue.component('CTabs', CTabs);
  Vue.component('CToggle', CToggle);
  Vue.component('CToggleBtn', CToggleBtn);
  Vue.component('CToggleContent', CToggleContent);
};
