import CDialog from './CDialog';
import { CBtn } from '../CBtn';

export default {
  title: 'Dialog',
  component: CDialog,
};

export const Default = () => ({
  components: { CDialog, CBtn },

  data() {
    return {
      open: false,
    };
  },

  template: `
    <div>
      <CBtn variant="default medium" @click="open = true">Open dialog</CBtn>

      <CDialog v-model="open" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3" aria-labelledby="dialog-title">
        <header class="flex pb-3 mb-6 border-b">
          <div class="flex-1">
            <h1 id="dialog-title" class="text-lg font-semibold">Dialog title</h1>
          </div>
          <div class="ml-4">
            <CBtn @click="open = false" class="p-2 leading-none" aria-label="Close dialog">
              <span>✗</span>
            </CBtn>
          </div>
        </header>

        <p>
          Lorem ipsum dolor sit amet.
        </p>
      </CDialog>
    </div>
  `,
});

export const Nested = () => ({
  components: { CDialog, CBtn },

  data() {
    return {
      open: false,
      childOpen: false,
    };
  },

  template: `
    <div>
      <CBtn variant="default medium" @click="open = true">Open dialog</CBtn>

      <CDialog v-model="open" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3" aria-labelledby="dialog-title">
        <header class="flex pb-3 mb-6 border-b">
          <div class="flex-1">
            <h1 id="dialog-title" class="text-lg font-semibold">Dialog title</h1>
          </div>
          <div class="ml-4">
            <CBtn @click="open = false" class="p-2 leading-none" aria-label="Close dialog">
              <span>✗</span>
            </CBtn>
          </div>
        </header>

        <p>
          Lorem ipsum dolor sit amet.
        </p>

        <div class="mt-4">
          <CBtn variant="default medium" @click="childOpen = true">Open Child Dialog</CBtn>
        </div>
      </CDialog>

      <CDialog v-model="childOpen" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3" aria-labelledby="dialog-title">
        <div>
          Hello, I’m a nested Dialog, nice to meet you.
        </div>

        <CBtn class="font-semibold mt-4" @click="childOpen = false">Cancel</CBtn>
      </CDialog>
    </div>
  `,
});

export const OpenByDefault = () => ({
  components: { CDialog, CBtn },

  data() {
    return {
      open: true,
    };
  },

  template: `
    <div>
      <CBtn variant="default medium" @click="open = true">Open dialog</CBtn>

      <CDialog v-model="open" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3" aria-labelledby="dialog-title">
        <header class="flex pb-3 mb-6 border-b">
          <div class="flex-1">
            <h1 id="dialog-title" class="text-lg font-semibold">Dialog title</h1>
          </div>
          <div class="ml-4">
            <CBtn @click="open = false" class="p-2 leading-none" aria-label="Close dialog">
              <span>✗</span>
            </CBtn>
          </div>
        </header>

        <p>
          Lorem ipsum dolor sit amet.
        </p>
      </CDialog>
    </div>
  `,
});

export const WithTransition = () => ({
  components: { CDialog, CBtn },

  data() {
    return {
      open: false,
    };
  },

  template: `
    <div>
      <CBtn variant="default medium" @click="open = true">Open dialog</CBtn>

      <CDialog v-model="open" :transition="{ name: 'fade' }" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3" aria-labelledby="dialog-title">
        <header class="flex pb-3 mb-6 border-b">
          <div class="flex-1">
            <h1 id="dialog-title" class="text-lg font-semibold">Dialog title</h1>
          </div>
          <div class="ml-4">
            <CBtn @click="open = false" class="p-2 leading-none" aria-label="Close dialog">
              <span>✗</span>
            </CBtn>
          </div>
        </header>

        <p>
          Lorem ipsum dolor sit amet.
        </p>
      </CDialog>
    </div>
  `,
});
