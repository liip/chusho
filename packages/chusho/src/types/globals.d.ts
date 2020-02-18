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

export interface ChushoOptions {
  btn: {
    default: string;
    variants: {
      [key: string]: string;
    };
    disabled: string;
  };
  stack: {
    gaps: {
      [key: string]: {
        containerClass: string;
        itemClass: string;
      };
    };
  };
}
