// import { AxiosRequestConfig } from 'axios';
import http from '/@/plugins/axios';
import { BASE } from '/@/api/common';
import type { Server } from '/@types/server';

// 查询年计划
export const searchYearPlans = (params?: object) => http.get<Server.YearsPlanPaging>(BASE + '/years/list', { params });

// 修改年计划
export const updateYearPlan = (id: string, data: object) => http.put(BASE + '/years/list/' + id, data);

// 删除年计划
export const deleteYearPlan = (id: string) => http.delete(BASE + '/years/list/' + id);

// 添加年计划
export const addYearPlan = (data?: object) => http.post(BASE + '/years/list', data);
