import { G } from '../common';

export declare namespace DiaryYears {
  interface TableDataRow {
    id: string | number;
    desc?: string;
    month?: number[];
  }

  type TableDataRows = TableDataRow[]

  type SlotScope = G.SlotScope<TableDataRow>
}
