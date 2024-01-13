export interface UiFieldStyles {
  field?: string;
}

export interface UiFieldExtra {
  [key: string]: any;
}
export interface UiField extends UiFieldExtra {
  name: string;
  label?: string;
  rules?: any;
  as: string;
  initialValue?: any;
  disabled?: boolean;
  options?: any;
  maskitoOptions?: any;
}
