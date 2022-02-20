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

type ComponentCommonOptions = {
  class?: VueClassBinding | ClassGenerator;
};

interface ComponentsOptions {
  alert?: ComponentCommonOptions;
  btn?: ComponentCommonOptions;
  checkbox?: ComponentCommonOptions;
  collapse?: ComponentCommonOptions & {
    transition?: BaseTransitionProps;
  };
  collapseBtn?: ComponentCommonOptions & {
    inheritBtnClass: boolean;
  };
  collapseContent?: ComponentCommonOptions & {
    transition?: BaseTransitionProps;
  };
  dialog?: ComponentCommonOptions & {
    overlayClass?: VueClassBinding | ClassGenerator;
    transition?: BaseTransitionProps;
  };
  icon?: ComponentCommonOptions & {
    spriteUrl?: string;
    width?: number;
    height?: number;
  };
  label?: ComponentCommonOptions;
  picture?: ComponentCommonOptions;
  select?: ComponentCommonOptions;
  selectBtn?: ComponentCommonOptions;
  selectOptions?: ComponentCommonOptions & {
    transition?: BaseTransitionProps;
  };
  selectOption?: ComponentCommonOptions;
  selectGroup?: ComponentCommonOptions;
  selectGroupLabel?: ComponentCommonOptions;
  tabs?: ComponentCommonOptions;
  tabList?: ComponentCommonOptions;
  tab?: ComponentCommonOptions;
  tabPanels?: ComponentCommonOptions;
  tabPanel?: ComponentCommonOptions;
  textarea?: ComponentCommonOptions;
  textField?: ComponentCommonOptions;
}

export interface ChushoOptions {
  rtl: () => boolean;
  components: ComponentsOptions;
}

export type ChushoUserOptions = DeepPartial<ChushoOptions>;
