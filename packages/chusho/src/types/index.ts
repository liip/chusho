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

export type ClassGenerator = (active: boolean) => VueClassBinding;

interface ComponentsOptions {
  btn?: {
    defaultClass?: string;
    variants?: Record<string, string>;
    disabledClass?: string;
  };
  icon?: {
    spriteUrl?: string;
    width?: number;
    height?: number;
    class?: string;
  };
  toggle?: {
    transition?: BaseTransitionProps;
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
    transition?: BaseTransitionProps;
  };
  alert?: {
    defaultClass?: string;
    variants?: Record<string, string>;
  };
}

export interface ChushoOptions {
  rtl: () => boolean;
  components: ComponentsOptions;
}

export type ChushoUserOptions = DeepPartial<ChushoOptions>;
