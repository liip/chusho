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

export interface ChushoOptions {
  components: {
    btn?: {
      default?: string;
      variants?: {
        [key: string]: string;
      };
      disabled?: string;
    };
    stack?: {
      gaps?: {
        [key: string]: {
          containerClass: string;
          itemClass: string;
        };
      };
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
  };
}
