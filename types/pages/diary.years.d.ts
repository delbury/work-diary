import { G } from '../common';

export declare namespace DiaryYears {
  interface TableDataRow extends G.BaseTableDataRow {
    desc?: string;
    month?: number[];
  }

  type TableDataRows = TableDataRow[]

  type SlotScope = G.SlotScope<TableDataRow>
}
