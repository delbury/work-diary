import { G } from '../common';

export declare namespace DiaryWeeks {
  interface TableDataRow extends G.BaseTableDataRow {
    desc?: string;
    week?: string;
    monthRemark?: string;
    yearPlanId: string;
  }

  type TableDataRows = TableDataRow[]

  type SlotScope = G.SlotScope<TableDataRow>
}
