import Router from 'koa-router';
import type { Server } from '/@types/server';
import { setSuccessedBody, setFailedBody, setFailedBodySearch, validateRequiredFields } from './common.js';
import { v4 } from 'uuid';

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
    const months = new Set(ctx.query.months ? ((ctx.query.months as string).split(',').map(it => +it)) : []);
    const keyword = (ctx.query.keyword ?? '') as string;

    const data = list.filter(item => {
      let flag = item.year === year;
      if(flag && months.size) {
        flag = flag && !!item.months?.some(it => months.has(it));
      }
      if(flag && keyword) {
        flag = flag && !!item.desc?.includes(keyword);
      }
      return flag;
    });
    const res: Server.YearsPlanPaging['body'] = {
      total: data.length,
      data,
    };
    setSuccessedBody(ctx, res);
  })
  // 添加
  .post('/list', async (ctx) => {
    const data = (ctx.request.body) as Server.YearsPlanRowRequest;
    if(validateRequiredFields(ctx, data, ['year', 'desc'])) {
      list.push({
        year: data.year,
        desc: data.desc,
        months: data.months,
        id: v4(),
      });
      setSuccessedBody(ctx);
    }
  })
  // 修改
  .put('/list/:id', async (ctx) => {
    const item = list.find(it => it.id === ctx.params.id);
    if(item) {
      const reqBody = ctx.request.body;
      item.desc = reqBody.desc ?? '';
      item.months = reqBody.months ?? [];
      item.year = reqBody.year ?? '';
      setSuccessedBody(ctx);
    } else {
      setFailedBodySearch(ctx);
    }
  })
  // 删除
  .delete('/list/:id', async (ctx) => {
    const index = list.findIndex(it => it.id === ctx.params.id);
    if(index > -1) {
      list.splice(index, 1);
      setSuccessedBody(ctx);
    } else {
      setFailedBodySearch(ctx);
    }
  });

export default router;
