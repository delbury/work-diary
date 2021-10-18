import { G } from '../common';

export declare namespace DiaryYears {
  interface TableDataRowBase {
    desc?: string;
    months?: number[];
    year: number;
  }
  interface TableDataRow extends G.BaseTableDataRow, TableDataRowBase {}

  type TableDataRows = TableDataRow[]

  type SlotScope = G.SlotScope<TableDataRow>
}
