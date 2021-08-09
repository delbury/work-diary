import http from '/@/plugins/axios';

// 查询年计划
export const searchYearPlans = () => http.get('http://127.0.0.1:4000');
