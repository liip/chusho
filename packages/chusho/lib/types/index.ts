import {
  AllowedComponentProps,
  Component,
  TransitionProps,
  VNodeProps,
} from 'vue';

import { InteractiveListItemRoles } from '../composables/useInteractiveListItem';

import { ToNormalizedVariant } from '../utils/components';

import CAlert from '../components/CAlert/CAlert';
import CBtn from '../components/CBtn/CBtn';
import CCheckbox from '../components/CCheckbox/CCheckbox';
import CCollapse from '../components/CCollapse/CCollapse';
import CCollapseBtn from '../components/CCollapse/CCollapseBtn';
import CCollapseContent from '../components/CCollapse/CCollapseContent';
import CDialog, { DialogData } from '../components/CDialog/CDialog';
import CFormGroup from '../components/CFormGroup/CFormGroup';
import CIcon from '../components/CIcon/CIcon';
import CLabel from '../components/CLabel/CLabel';
import CMenu from '../components/CMenu/CMenu';
import CMenuBtn from '../components/CMenu/CMenuBtn';
import CMenuItem from '../components/CMenu/CMenuItem';
import CMenuLink from '../components/CMenu/CMenuLink';
import CMenuList from '../components/CMenu/CMenuList';
import CMenuSeparator from '../components/CMenu/CMenuSeparator';
import CPicture from '../components/CPicture/CPicture';
import CRadio from '../components/CRadio/CRadio';
import CSelect from '../components/CSelect/CSelect';
import CSelectBtn from '../components/CSelect/CSelectBtn';
import CSelectGroup from '../components/CSelect/CSelectGroup';
import CSelectGroupLabel from '../components/CSelect/CSelectGroupLabel';
import CSelectOption from '../components/CSelect/CSelectOption';
import CSelectOptions from '../components/CSelect/CSelectOptions';
import CTab from '../components/CTabs/CTab';
import CTabList from '../components/CTabs/CTabList';
import CTabPanel from '../components/CTabs/CTabPanel';
import CTabPanels from '../components/CTabs/CTabPanels';
import CTabs from '../components/CTabs/CTabs';
import CTextField from '../components/CTextField/CTextField';
import CTextarea from '../components/CTextarea/CTextarea';

export interface DollarChusho {
  options: ChushoOptions;
  openDialogs: DialogData[];
}

export type VueClassBinding =
  | string
  | Record<string, unknown>
  | Array<Record<string, unknown> | string>;

export type ClassGenerator<T> = (ctx: T) => VueClassBinding;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<
      InstanceType<C>['$props'],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : never;

// eslint-disable-next-line @typescript-eslint/ban-types
type ComponentOptionClass<C extends Component, P = {}> =
  | VueClassBinding
  | ClassGenerator<ToNormalizedVariant<ComponentProps<C>> & P>;

interface ComponentsOptions {
  alert?: {
    class?: ComponentOptionClass<typeof CAlert>;
  };
  btn?: {
    class?: ComponentOptionClass<typeof CBtn>;
  };
  checkbox?: {
    class?: ComponentOptionClass<
      typeof CCheckbox,
      {
        required: boolean;
        disabled: boolean;
        checked: boolean;
      }
    >;
  };
  collapse?: {
    class?: ComponentOptionClass<
      typeof CCollapse,
      {
        active: boolean;
      }
    >;
  };
  collapseBtn?: {
    class?: ComponentOptionClass<
      typeof CCollapseBtn,
      {
        active: boolean;
      }
    >;
  };
  collapseContent?: {
    class?: ComponentOptionClass<typeof CCollapseContent>;
    transition?: TransitionProps;
  };
  dialog?: {
    class?: ComponentOptionClass<typeof CDialog>;
    overlayClass?: ComponentOptionClass<typeof CSelect>;
    transition?: TransitionProps;
  };
  formGroup?: {
    class?: ComponentOptionClass<typeof CFormGroup>;
    as?: string;
  };
  icon?: {
    class?: ComponentOptionClass<typeof CIcon>;
    spriteUrl?: string;
    width?: number;
    height?: number;
  };
  label?: {
    class?: ComponentOptionClass<typeof CLabel>;
  };
  menu?: {
    class?: ComponentOptionClass<typeof CMenu, { open: boolean }>;
  };
  menuBtn?: {
    class?: ComponentOptionClass<
      typeof CMenuBtn,
      {
        disabled: boolean;
        active: boolean;
      }
    >;
  };
  menuItem?: {
    class?: ComponentOptionClass<
      typeof CMenuItem,
      {
        role: InteractiveListItemRoles;
        selected: boolean;
      }
    >;
  };
  menuLink?: {
    class?: ComponentOptionClass<typeof CMenuLink>;
  };
  menuList?: {
    class?: ComponentOptionClass<typeof CMenuList>;
    transition?: TransitionProps;
  };
  menuSeparator?: {
    class?: ComponentOptionClass<typeof CMenuSeparator>;
  };
  picture?: {
    class?: ComponentOptionClass<typeof CPicture>;
  };
  radio?: {
    class?: ComponentOptionClass<
      typeof CRadio,
      {
        checked: boolean;
      }
    >;
  };
  select?: {
    class?: ComponentOptionClass<
      typeof CSelect,
      {
        open: boolean;
      }
    >;
  };
  selectBtn?: {
    class?: ComponentOptionClass<
      typeof CSelectBtn,
      {
        active: boolean;
        disabled: boolean;
      }
    >;
  };
  selectGroup?: {
    class?: ComponentOptionClass<typeof CSelectGroup>;
  };
  selectGroupLabel?: {
    class?: ComponentOptionClass<typeof CSelectGroupLabel>;
  };
  selectOptions?: {
    class?: ComponentOptionClass<typeof CSelectOptions>;
    transition?: TransitionProps;
  };
  selectOption?: {
    class?: ComponentOptionClass<
      typeof CSelectOption,
      {
        selected: boolean;
      }
    >;
  };
  tab?: {
    class?: ComponentOptionClass<
      typeof CTab,
      {
        active: boolean;
      }
    >;
  };
  tabList?: {
    class?: ComponentOptionClass<typeof CTabList>;
  };
  tabPanel?: {
    class?: ComponentOptionClass<
      typeof CTabPanel,
      {
        active: boolean;
      }
    >;
  };
  tabPanels?: {
    class?: ComponentOptionClass<typeof CTabPanels>;
  };
  tabs?: {
    class?: ComponentOptionClass<typeof CTabs>;
  };
  textField?: {
    class?: ComponentOptionClass<
      typeof CTextField,
      {
        required: boolean;
        disabled: boolean;
        readonly: boolean;
      }
    >;
  };
  textarea?: {
    class?: ComponentOptionClass<
      typeof CTextarea,
      {
        required: boolean;
        disabled: boolean;
        readonly: boolean;
      }
    >;
  };
}

export interface ChushoOptions {
  rtl: () => boolean;
  components: ComponentsOptions;
}

export type ChushoUserOptions = Partial<ChushoOptions>;
