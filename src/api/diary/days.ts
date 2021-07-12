import http from '/@/plugins/axios';
import { APIHandler } from '/@types/plugins/axios';

// 查询月计划
export const searchDayPlans: APIHandler = () => [
  { date: '2021-07-04',
    plans: [
      { desc: '一个大任务1' },
      { desc: '一个大任务2' },
    ] },
  { date: '2021-07-11', plans: [] },
  { date: '2021-07-21', plans: [] },
];
