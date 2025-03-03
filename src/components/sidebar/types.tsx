export interface MenuItemType {
    title: string;
    icon: React.ReactNode;
    children?: MenuItemType[];
  }