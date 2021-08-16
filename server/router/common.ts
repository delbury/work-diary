import type { Server } from '/@types/server';

// 请求成功的返回数据
export function getSuccessedBody<T>(data?: T): Server.ResponseType<T> {
  return {
    code: 200,
    msg: '操作成功',
    body: data,
  };
}

// 请求失败的返回数据
export function getFailedBody(msg = '操作失败') {
  return {
    code: 400,
    msg,
  };
}
