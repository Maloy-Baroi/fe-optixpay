export interface MenuItem {
    id: number;
    label: string;
    icon?: JSX.Element;
    path: string;
    children?: MenuItem[];
  }
  
  export type MenuList = MenuItem[];
  export interface GroupedMenuList {
    key: string;
    label: string;
    icon?: JSX.Element;
    children?: {
      key: string;
      label: string;
    }[];
  }