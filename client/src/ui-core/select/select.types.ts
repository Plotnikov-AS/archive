export type SelectOption = {
  id: string;
  collectionName: string;
  title: string;
}

export type IUiSelectProps = {
  model?: any;
  errorMessage?: string;
  options?: SelectOption[];
  name: string;
  placeholder?: string | number;
  label?: string | number;
  inset?: boolean;
  disabled?: boolean;
  filterable?: boolean;
  expandable?: boolean;
  multiple?: boolean;
}

export type IUiSelectEmits = {
  (event: 'update:model', value: SelectOption): void;
  (event: 'update:options', value: { title: string, collectionName: string }): void;
}
