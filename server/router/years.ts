import Router from 'koa-router';
import type { Server } from '/@types/server';
import { SUCCESS_RES, FAIL_RES } from './common.js';

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
    const res: Server.YearsPlanPaging = {
      total: data.length,
      data,
    };
    ctx.body = res;
  })
  // 添加
  .post('/list', async (ctx) => {
  })
  // 修改
  .put('/list/:id', async (ctx) => {
    console.log(ctx.params);
    const index = list.findIndex(it => it.id === ctx.params.id);
    if(index > -1) {
      list[index] = { ...list[index] };
      ctx.body = SUCCESS_RES;
    } else {
      ctx.body = FAIL_RES;
    }
  })
  // 删除
  .delete('/list/:id', async (ctx) => {});

export default router;
