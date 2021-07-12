import http, { GetResultType } from '/@/plugins/axios';

// 查询年计划
export const searchYearPlans = (): GetResultType => http.get('http://127.0.0.1:4000');
