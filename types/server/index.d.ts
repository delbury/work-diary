import type { Pages } from '/@types/pages';


export declare namespace Server {
  // 返回分页数据
  interface BasePaging<T extends object> {
    total: number; // 总条数
    // pageNum: number; // 当前页
    // pageSize: number; // 每页条数
    data: T[]; // 数据列表
  }


  // 年计划行数据
  export type YearsPlanRow = Pages.DiaryYears.TableDataRow;
  export type YearsPlanPaging = BasePaging<Pages.DiaryYears.TableDataRow>;
}
