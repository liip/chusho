import { BaseTransitionProps } from 'vue';

import { DeepPartial } from './utils';

import { DialogData } from '../components/CDialog/CDialog';

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
  collapseBtn?: ComponentCommonOptions;
  collapseContent?: ComponentCommonOptions & {
    transition?: BaseTransitionProps;
  };
  dialog?: ComponentCommonOptions & {
    overlayClass?: VueClassBinding | ClassGenerator;
    transition?: BaseTransitionProps;
  };
  formGroup?: ComponentCommonOptions & {
    as?: string;
  };
  icon?: ComponentCommonOptions & {
    spriteUrl?: string;
    width?: number;
    height?: number;
  };
  menu?: ComponentCommonOptions;
  menuBtn?: ComponentCommonOptions;
  menuItem?: ComponentCommonOptions;
  menuLink?: ComponentCommonOptions;
  menuList?: ComponentCommonOptions & {
    transition?: BaseTransitionProps;
  };
  menuSeparator?: ComponentCommonOptions;
  label?: ComponentCommonOptions;
  picture?: ComponentCommonOptions;
  radio?: ComponentCommonOptions;
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
