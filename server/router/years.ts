import Router from 'koa-router';
import type { Server } from '/@types/server';
import { getSuccessedBody, getFailedBody } from './common.js';

const router = new Router();

// 记录表
// let idCount = 4;
const list: Server.YearsPlanRow[] = [
  {
    id: '001',
    desc: '成为领导',
    months: [1, 3, 4, 6, 7],
    year: 2021,
  },
  {
    id: '002',
    desc: '做掉不听话娃儿',
    months: [1, 2, 9, 11],
    year: 2021,
  },
  {
    id: '003',
    desc: '赚钱',
    months: [5, 7],
    year: 2022,
  },
];


router
  // 查询
  .get('/list', async (ctx) => {
    const year = Number(ctx.query.year) ?? '';
    const data = list.filter(item => item.year === year);
    const res: Server.YearsPlanPaging['body'] = {
      total: data.length,
      data,
    };
    ctx.body = getSuccessedBody(res);
  })
  // 添加
  .post('/list', async (ctx) => {
  })
  // 修改
  .put('/list/:id', async (ctx) => {
    const item = list.find(it => it.id === ctx.params.id);
    if(item) {
      const reqBody = ctx.request.body;
      item.desc = reqBody.desc ?? '';
      item.months = reqBody.months ?? [];
      item.year = reqBody.year ?? '';
      ctx.body = getSuccessedBody();
    } else {
      ctx.body = getFailedBody();
    }
  })
  // 删除
  .delete('/list/:id', async (ctx) => {
    const index = list.findIndex(it => it.id === ctx.params.id);
    if(index > -1) {
      list.splice(index, 1);
      ctx.body = getSuccessedBody();
    } else {
      ctx.body = getFailedBody();
    }
  });

export default router;
