import { SelectOption } from '../select/select.types';

export interface UiDropdownStyles {
  dropdown?: string;
  disabled?: string;
  list?: string;
  item?: string;
  itemFocused?: string;
  text?: string;
}

export type IUiDropdownProps = {
  dropdownId: string;
  selectedIndexList?: any[];
  optionsLength: number;
  inputValue?: string;
  collectionName: string;
  items?: SelectOption[];
  disabled?: boolean;
  isSelectMultiple?: boolean;
  expandable?: boolean;
}

export type IUiDropdownEmits = {
  (event: 'select', value: any): void;
  (event: 'addOption', value: string): void;
}
