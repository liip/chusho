import CFlex from './CFlex';
import CFlexItem from './CFlexItem';

export default {
  title: 'Flex',
  component: CFlex,
  subcomponents: { CFlexItem },
};

export const GridResponsive = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="2">
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          1
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          2
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          3
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '2/3' }">
        <div class="bg-gray-200 p-2">
          4
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '1/3' }">
        <div class="bg-gray-200 p-2">
          5
        </div>
      </CFlexItem>
      <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          6
        </div>
      </CFlexItem>
      <CFlexItem :width="{ sm: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          7
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const DifferentGapByAxis = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex :gap="[3, 6]">
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          1
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          2
        </div>
      </CFlexItem>
      <CFlexItem width="1/3">
        <div class="bg-gray-200 p-2">
          3
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '2/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          4
        </div>
      </CFlexItem>
      <CFlexItem :width="{ md: '1/3', lg: '1/2' }">
        <div class="bg-gray-200 p-2">
          5
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Stack = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="3">
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          1
        </div>
      </CFlexItem>
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          2
        </div>
      </CFlexItem>
      <CFlexItem>
        <div class="p-2 bg-gray-200">
          3
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Inline = () => ({
  components: { CFlex, CFlexItem },
  data() {
    return {
      colors: [
        'Alice Blue',
        'Antique White',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'Blanched Almond',
        'Blue',
        'Blue Violet',
        'Brown',
        'Burly Wood',
        'Cadet Blue',
        'Chartreuse',
        'Chocolate',
        'Coral',
        'Cornflower Blue',
        'Cornsilk',
        'Crimson',
        'Cyan',
        'Dark Blue',
        'Dark Cyan',
        'Dark GoldenRod',
        'Dark Gray',
        'Dark Green',
      ],
    };
  },
  template: `
    <CFlex gap="2">
      <CFlexItem width="auto" v-for="(color, i) in colors" :key="i">
        <div class="bg-gray-200 p-2">
          {{ color }}
        </div>
      </CFlexItem>
    </CFlex>
  `,
});

export const Nested = () => ({
  components: { CFlex, CFlexItem },
  template: `
    <CFlex gap="8">
      <CFlexItem width="1/2">
        <CFlex gap="2">
          <CFlexItem width="full">
            <div class="p-2 bg-gray-200">
              Column 1, item 1
            </div>
          </CFlexItem>
          <CFlexItem width="full">
            <div class="p-2 bg-gray-200">
              Column 1, item 2
            </div>
          </CFlexItem>
        </CFlex>
      </CFlexItem>
      <CFlexItem width="1/2">
        <div class="p-2 bg-gray-200">
          Column 2
        </div>
      </CFlexItem>
    </CFlex>
  `,
});
