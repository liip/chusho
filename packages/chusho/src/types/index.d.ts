declare global {
  export type Dictionary<T> = Record<string, T>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $chusho: {
      options: ChushoOptions;
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

export interface ChushoOptions {
  components: {
    btn?: {
      default?: string;
      variants?: {
        [key: string]: string;
      };
      disabled?: string;
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
  };
}
