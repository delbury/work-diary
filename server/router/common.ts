import type { Server } from '/@types/server';
import { ParameterizedContext } from 'koa';

// 请求成功的返回数据
export function setSuccessedBody<T>(ctx: ParameterizedContext, data?: T) {
  ctx.body = {
    code: 200,
    msg: '操作成功',
    body: data,
  };
}

// 请求失败的返回数据
export function setFailedBody(ctx: ParameterizedContext, msg = '操作失败') {
  ctx.status = 400;
  ctx.body = {
    code: 400,
    msg,
  };
}

// 查询失败
export const setFailedBodySearch = (ctx: ParameterizedContext) => () => setFailedBody(ctx, '查询不到该数据');

// 验证值是否为空，空字符串，空数组，null，undefined
const isEmpty = (value: any) => value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length);

// 验证必填字段
export const validateRequiredFields = (ctx: ParameterizedContext, params: {[k: string]: any}, keys: Array<string>): boolean => {
  let errMsg: string | null = null;
  if(typeof params !== 'object') {
    errMsg = '传入参数错误';
  }

  // 验证必填字段是否为空
  console.log(keys);
  for(const key of keys) {
    if((key in params) && isEmpty(params[key])) {
      errMsg = `${key} 字段不能为空`;
      break;
    }
  }

  if(errMsg) {
    setFailedBody(ctx, errMsg);
    return false;
  }

  return true;
};
