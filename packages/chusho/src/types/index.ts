import { DeepPartial, Dictionary } from 'ts-essentials';

declare module 'vue/types/vue' {
  interface Vue {
    $chusho: DollarChusho;
    $nuxt?: object;
  }

  interface VueConstructor {
    util: {
      warn(msg: string, vm?: Vue): void;
    };
  }
}

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}

export interface DollarChusho {
  options: ChushoOptions;
  openDialogs: object[];
}

export interface VueTransitionProps {
  name?: string;
  appear?: boolean;
  css?: boolean;
  mode?: string;
  type?: string;
  enterClass?: string;
  leaveClass?: string;
  enterToClass?: string;
  leaveToClass?: string;
  enterActiveClass?: string;
  leaveActiveClass?: string;
  appearClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  duration?: [number, string, object];
}

export interface ContainerItemClass {
  containerClass: string;
  itemClass: string;
}

type TabClassGenerator = (
  active: boolean
) => string | object | Array<object | string>;

interface ComponentsOptions {
  btn?: {
    defaultClass?: string;
    variants?: Dictionary<string>;
    disabledClass?: string;
  };
  icon?: {
    spriteUrl?: string;
    width?: number;
    height?: number;
    class?: string;
  };
  toggle?: {
    transition?: VueTransitionProps;
  };
  flex: {
    containerClass?: string;
    itemClass?: string;
    gaps?: {
      x?: Dictionary<ContainerItemClass>;
      y?: Dictionary<ContainerItemClass>;
    };
    widths?: Dictionary<string>;
    defaultWidth?: string;
    responsiveWidthGenerator(breakpoint: string, width: string): string;
  };
  tabs?: {
    tabsClass?: string;
    tabListClass?: string;
    tabPanelsClass?: string;
    tabPanelClass?: string | TabClassGenerator;
    tabClass?: string | TabClassGenerator;
  };
  dialog?: {
    overlayClass?: string;
    dialogClass?: string;
    transition?: VueTransitionProps;
  };
}

export interface ChushoOptions {
  rtl: Function;
  components: ComponentsOptions;
}

export interface ChushoUserOptions {
  rtl?: Function;
  components?: DeepPartial<ComponentsOptions>;
}
