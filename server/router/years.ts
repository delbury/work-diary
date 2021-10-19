import Router from 'koa-router';
import type { Server } from '/@types/server';
import { setSuccessedBody, setFailedBody, setFailedBodySearch, validateRequiredFields } from './tools/common.js';
import { v4 } from 'uuid';
import { formatParams } from './tools/util.js';

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
    const { year, months, keyword, onlyUnassigned } = formatParams(ctx.query, {
      year: 'number',
      months: 'array-number',
      keyword: 'string',
      onlyUnassigned: 'number',
    });

    const monthsSet = new Set(months as number[]);

    // TODO 使用数据库
    const data = list.filter(item => {
      let flag = item.year === year;
      if(flag && monthsSet.size && !onlyUnassigned) {
        flag = flag && !!item.months?.some(it => monthsSet.has(it));
      }
      if(onlyUnassigned) {
        flag = flag && !item.months?.length;
      }
      if(flag && keyword) {
        flag = flag && !!item.desc?.includes(keyword as string);
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
      // TODO 使用数据库
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
      // TODO 使用数据库
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
    const set = new Set(ctx.params.id.split(','));

    // TODO 使用数据库
    const temp = [...list].filter(it => !set.has(it.id));
    list.length = 0;
    list.push(...temp);

    setSuccessedBody(ctx);
  });

export default router;
