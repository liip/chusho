import { ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CTab, CTabList, CTabPanel, CTabPanels, CTabs } from '.';

describe('CTabs', () => {
  it('applies local and global classes', () => {
    const value = '1';

    cy.mount(
      <CTabs v-model={value} data-test="tabs" class="tabs">
        <CTabList data-test="tablist" class="tablist">
          <CTab target="1" data-test="tab-1" class="tab">
            Tab 1
          </CTab>
          <CTab target="2" data-test="tab-2" class="tab">
            Tab 2
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels" class="tabpanels">
          <CTabPanel id="1" data-test="tabpanel-1" class="tabpanel">
            Panel 1
          </CTabPanel>
          <CTabPanel id="2" data-test="tabpanel-2" class="tabpanel">
            Panel 2
          </CTabPanel>
        </CTabPanels>
      </CTabs>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  tabs: {
                    class: 'config-tabs',
                  },
                  tabList: {
                    class: 'config-tablist',
                  },
                  tab: {
                    class({ active }) {
                      return {
                        'config-tab': true,
                        active,
                      };
                    },
                  },
                  tabPanels: {
                    class: 'config-tabpanels',
                  },
                  tabPanel: {
                    class({ active }) {
                      return {
                        'config-tabpanel': true,
                        active,
                      };
                    },
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="tabs"]').should(
      'have.attr',
      'class',
      'tabs config-tabs'
    );
    cy.get('[data-test="tablist"]').should(
      'have.attr',
      'class',
      'tablist config-tablist'
    );
    cy.get('[data-test="tab-1"]').should(
      'have.attr',
      'class',
      'tab config-tab active'
    );
    cy.get('[data-test="tab-2"]').should(
      'have.attr',
      'class',
      'tab config-tab'
    );
    cy.get('[data-test="tabpanels"]').should(
      'have.attr',
      'class',
      'tabpanels config-tabpanels'
    );
    cy.get('[data-test="tabpanel-1"]').should(
      'have.attr',
      'class',
      'tabpanel config-tabpanel active'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="tabs"]').should('not.have.class', 'config-tabs');
    });
  });

  it('applies the right attributes', () => {
    cy.mount(
      <CTabs default-tab="1" data-test="tabs">
        <CTabList data-test="tablist">
          <CTab target="1" data-test="tab-1">
            Tab 1
          </CTab>
          <CTab target="2" data-test="tab-2">
            Tab 2
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels">
          <CTabPanel id="1" data-test="tabpanel-1">
            Panel 1
          </CTabPanel>
          <CTabPanel id="2" data-test="tabpanel-2">
            Panel 2
          </CTabPanel>
        </CTabPanels>
      </CTabs>
    );

    cy.get('[data-test="tablist"]').should('have.attr', 'role', 'tablist');

    cy.get('button[data-test="tab-1"]')
      .should('have.attr', 'role', 'tab')
      .and('have.attr', 'type', 'button')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'tabindex', '0')
      .then(([tab]) => {
        cy.get('[data-test="tabpanel-1"]')
          .should('have.attr', 'role', 'tabpanel')
          .should('have.attr', 'tabindex', '0')
          .and('have.attr', 'id', tab.getAttribute('aria-controls'))
          .and('have.attr', 'aria-labelledby', tab.getAttribute('id'));
      });

    cy.get('button[data-test="tab-2"]')
      .should('have.attr', 'role', 'tab')
      .and('have.attr', 'type', 'button')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'tabindex', '-1');

    cy.get('[data-test="tabpanel-2"]').should('not.exist');
  });

  it('activates the default tab', () => {
    cy.mount(
      <CTabs default-tab="1" data-test="tabs">
        <CTabList data-test="tablist">
          <CTab target="1" data-test="tab-1">
            Tab 1
          </CTab>
          <CTab target="2" data-test="tab-2">
            Tab 2
          </CTab>
          <CTab target="3" data-test="tab-3">
            Tab 3
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels">
          <CTabPanel id="1" data-test="tabpanel-1">
            Panel 1
          </CTabPanel>
          <CTabPanel id="2" data-test="tabpanel-2">
            Panel 2
          </CTabPanel>
          <CTabPanel id="3" data-test="tabpanel-3">
            Panel 3
          </CTabPanel>
        </CTabPanels>
      </CTabs>
    );

    cy.get('[data-test="tab-1"]')
      .should('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'tabindex', '0');
    cy.get('[data-test="tabpanel-1"]').should('be.visible');
  });

  it('activates the v-model tab, updates it and watch it', () => {
    const activeTab = ref('2');

    const wrapper = cy.mount(
      <CTabs
        modelValue={activeTab.value}
        onUpdate:modelValue={(modelValue) => {
          wrapper.then((wrapper) => wrapper.setProps({ modelValue }));
        }}
        data-test="tabs"
      >
        <CTabList data-test="tablist">
          <CTab target="1" data-test="tab-1">
            Tab 1
          </CTab>
          <CTab target="2" data-test="tab-2">
            Tab 2
          </CTab>
          <CTab target="3" data-test="tab-3">
            Tab 3
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels">
          <CTabPanel id="1" data-test="tabpanel-1">
            Panel 1
          </CTabPanel>
          <CTabPanel id="2" data-test="tabpanel-2">
            Panel 2
          </CTabPanel>
          <CTabPanel id="3" data-test="tabpanel-3">
            Panel 3
          </CTabPanel>
        </CTabPanels>
      </CTabs>
    );

    cy.get('[data-test="tab-2"]')
      .should('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'tabindex', '0');
    cy.get('[data-test="tabpanel-2"]').should('be.visible');

    cy.get('[data-test="tab-3"]').click();
    cy.get('[data-test="tab-1"]').click();

    cy.getWrapper().then((wrapper) => {
      expect(wrapper.emitted('update:modelValue')).to.deep.eq([['3'], ['1']]);

      wrapper.setProps({ modelValue: '2' });

      cy.get('[data-test="tab-2"]')
        .should('have.attr', 'aria-selected', 'true')
        .and('have.attr', 'tabindex', '0');
    });
  });

  it('v-model works with numbers, including 0', () => {
    const activeTab = ref(0);

    const wrapper = cy.mount(
      <CTabs
        modelValue={activeTab.value}
        onUpdate:modelValue={(modelValue) => {
          wrapper.then((wrapper) => wrapper.setProps({ modelValue }));
        }}
        data-test="tabs"
      >
        <CTabList data-test="tablist">
          <CTab target={0} data-test="tab-0">
            Tab 1
          </CTab>
          <CTab target={1} data-test="tab-1">
            Tab 2
          </CTab>
          <CTab target={2} data-test="tab-2">
            Tab 3
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels">
          <CTabPanel id={0} data-test="tabpanel-0">
            Panel 1
          </CTabPanel>
          <CTabPanel id={1} data-test="tabpanel-1">
            Panel 2
          </CTabPanel>
          <CTabPanel id={2} data-test="tabpanel-2">
            Panel 3
          </CTabPanel>
        </CTabPanels>
      </CTabs>
    );

    cy.get('[data-test="tab-0"]')
      .should('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'tabindex', '0');
    cy.get('[data-test="tabpanel-0"]').should('be.visible');

    cy.get('[data-test="tab-2"]').click();
    cy.get('[data-test="tab-1"]').click();

    cy.getWrapper().then((wrapper) => {
      expect(wrapper.emitted('update:modelValue')).to.deep.eq([[2], [1]]);

      wrapper.setProps({ modelValue: 0 });

      cy.get('[data-test="tab-0"]')
        .should('have.attr', 'aria-selected', 'true')
        .and('have.attr', 'tabindex', '0');
    });
  });

  it('can be navigated with a keyboard', () => {
    cy.mount(
      <CTabs default-tab="1" data-test="tabs">
        <CTabList data-test="tablist">
          <CTab target="1" data-test="tab-1">
            Tab 1
          </CTab>
          <CTab target="2" data-test="tab-2">
            Tab 2
          </CTab>
          <CTab target="3" data-test="tab-3">
            Tab 3
          </CTab>
        </CTabList>

        <CTabPanels data-test="tabpanels">
          <CTabPanel id="1" data-test="tabpanel-1">
            Panel 1
          </CTabPanel>
          <CTabPanel id="2" data-test="tabpanel-2">
            Panel 2
          </CTabPanel>
          <CTabPanel id="3" data-test="tabpanel-3">
            Panel 3
          </CTabPanel>
        </CTabPanels>
      </CTabs>
    );

    cy.get('[data-test="tab-1"]')
      .should('not.be.focused')
      .click()
      .trigger('keydown', { key: 'ArrowRight' });
    cy.get('[data-test="tab-2"]')
      .should('be.focused')
      .trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-test="tab-3"]')
      .should('be.focused')
      .trigger('keydown', { key: 'ArrowRight' });
    // Should loop back to the first item
    cy.get('[data-test="tab-1"]')
      .should('be.focused')
      .trigger('keydown', { key: 'End' });
    cy.get('[data-test="tab-3"]')
      .should('be.focused')
      .trigger('keydown', { key: 'Home' });
    // Should loop back to the last item
    cy.get('[data-test="tab-1"]')
      .should('be.focused')
      .trigger('keydown', { key: 'ArrowLeft' });
    cy.get('[data-test="tab-3"]')
      .should('be.focused')
      .trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-test="tab-2"]').should('be.focused');
  });

  describe('dynamic', () => {
    const tabs = ref<number[]>([]);

    beforeEach(() => {
      tabs.value = [1, 2, 3];

      cy.mount(
        <CTabs default-tab={1}>
          <CTabList data-test="tablist">
            {tabs.value.map((tab) => (
              <CTab target={tab} data-test={`tab-${tab}`} key={tab}>
                Tab {tab}
              </CTab>
            ))}
          </CTabList>

          <CTabPanels data-test="tabpanels">
            {tabs.value.map((tab) => (
              <CTabPanel id={tab} data-test={`tabpanel-${tab}`} key={tab}>
                Panel {tab}
              </CTabPanel>
            ))}
          </CTabPanels>
        </CTabs>
      );
    });

    it('handles dynamically added tabs', () => {
      cy.contains('Tab 4').should('not.exist');

      cy.getWrapper().then(() => {
        tabs.value.push(4);
      });

      cy.contains('Tab 4').click();
      cy.get('[data-test="tabpanels"]').should('contain', 'Panel 4');
      cy.focused()
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' });
      cy.focused().should('have.attr', 'data-test', 'tab-4');
    });

    it('handles dynamically removed tabs', () => {
      cy.contains('Tab 2').click();

      cy.getWrapper().then(() => {
        tabs.value.pop();
      });

      cy.get('[data-test="tablist"] [role="tab"]').should('have.length', 2);
      cy.contains('Tab 1').click().trigger('keydown', { key: 'Right' });
      cy.focused().should('have.attr', 'data-test', 'tab-2');
    });

    it('activates first tab when currently active tab is removed', () => {
      cy.contains('Tab 3').click();

      cy.getWrapper().then(() => {
        tabs.value.pop();
      });

      cy.contains('Tab 1').should('have.attr', 'aria-selected', 'true');
    });
  });
});
