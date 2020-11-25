import { BaseTransitionProps } from 'vue';

import { DialogData } from '../components/CDialog/CDialog';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends Readonly<infer U>[]
    ? Readonly<DeepPartial<U>>[]
    : DeepPartial<T[P]>;
};

export interface DollarChusho {
  options: ChushoOptions;
  openDialogs: DialogData[];
}

export interface ContainerItemClass {
  containerClass: string;
  itemClass: string;
}

export type VueClassBinding =
  | string
  | Record<string, boolean>
  | Array<Record<string, boolean> | string>;

export type ClassGenerator = (ctx?: Record<string, unknown>) => VueClassBinding;

interface ComponentsOptions {
  alert?: {
    class?: VueClassBinding | ClassGenerator;
  };
  btn?: {
    class?: VueClassBinding | ClassGenerator;
  };
  dialog?: {
    class?: VueClassBinding | ClassGenerator;
    overlayClass?: VueClassBinding | ClassGenerator;
    transition?: BaseTransitionProps;
  };
  icon?: {
    spriteUrl?: string;
    width?: number;
    height?: number;
    class?: VueClassBinding | ClassGenerator;
  };
  tabs?: {
    class?: VueClassBinding | ClassGenerator;
  };
  tabList?: {
    class?: VueClassBinding | ClassGenerator;
  };
  tab?: {
    class?: VueClassBinding | ClassGenerator;
  };
  tabPanels?: {
    class?: VueClassBinding | ClassGenerator;
  };
  tabPanel?: {
    class?: VueClassBinding | ClassGenerator;
  };
  toggle?: {
    class?: VueClassBinding | ClassGenerator;
    transition?: BaseTransitionProps;
  };
  toggleBtn?: {
    class?: VueClassBinding | ClassGenerator;
    inheritBtnClass: boolean;
  };
  toggleContent?: {
    class?: VueClassBinding | ClassGenerator;
    transition?: BaseTransitionProps;
  };
}

export interface ChushoOptions {
  rtl: () => boolean;
  components: ComponentsOptions;
}

export type ChushoUserOptions = DeepPartial<ChushoOptions>;
