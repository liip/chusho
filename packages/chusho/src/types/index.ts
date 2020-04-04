declare global {
  export type Dictionary<T> = Record<string, T>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $chusho: {
      options: ChushoOptions;
    };
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
    variants?: {
      [key: string]: string;
    };
    disabledClass?: string;
  };
  icon?: {
    spriteUrl?: string;
    width?: number;
    height?: number;
    class?: string;
  };
  toggle?: {
    transition?: VueTransitionProps | null;
  };
  flex: {
    containerClass?: string;
    itemClass?: string;
    gaps?: {
      x?: {
        [key: string]: ContainerItemClass;
      };
      y?: {
        [key: string]: ContainerItemClass;
      };
    };
    widths?: {
      [key: string]: string;
    };
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
}

export interface ChushoOptions {
  rtl: Function;
  components: ComponentsOptions;
}

export interface ChushoUserOptions {
  rtl?: Function;
  components?: Partial<ComponentsOptions>;
}
