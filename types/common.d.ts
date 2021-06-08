export declare namespace G {
  // select 选择项的类型
  interface OptionType {
    label: string;
    value: string | number;
  }
  // select 选择项的数组类型
  type OptionsType = OptionType[]

  // table slot-scope 数据类型
  interface SlotScope<T extends object> {
    $index: number;
    column: object;
    row: T;
    store: object;
    _self: object;
  }
}
