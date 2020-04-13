import { DeepPartial, Dictionary } from 'ts-essentials';

declare module 'vue/types/vue' {
  interface Vue {
    $chusho: DollarChusho;
    $nuxt?: Dictionary<unknown>;
  }

  interface VueConstructor {
    util: {
      warn(msg: string, vm?: Vue): void;
    };
  }
}

declare module '@vue/composition-api' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}

export interface DollarChusho {
  options: ChushoOptions;
  openDialogs: Vue[];
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
  duration?: [
    number,
    string,
    {
      enter: number;
      leave: number;
    }
  ];
}

export interface ContainerItemClass {
  containerClass: string;
  itemClass: string;
}

type VueClassBinding =
  | string
  | Dictionary<boolean, string>
  | Array<Dictionary<boolean, string> | string>;

export type ClassGenerator = (active: boolean) => VueClassBinding;

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
    tabPanelClass?: string | ClassGenerator;
    tabClass?: string | ClassGenerator;
  };
  dialog?: {
    overlayClass?: string;
    dialogClass?: string;
    transition?: VueTransitionProps;
  };
  alert?: {
    defaultClass?: string;
    variants?: Dictionary<string>;
  };
}

export interface ChushoOptions {
  rtl: () => boolean;
  components: ComponentsOptions;
}

export type ChushoUserOptions = DeepPartial<ChushoOptions>;
