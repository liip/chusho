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

interface ComponentsOptions {
  btn?: {
    default?: string;
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
    responsiveWidthGenerator: Function;
  };
}

export interface ChushoOptions {
  components: ComponentsOptions;
}

export interface ChushoUserOptions {
  components?: Partial<ComponentsOptions>;
}
