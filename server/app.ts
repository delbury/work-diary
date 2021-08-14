import Koa from 'koa';
import router from './router/index.js';

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods({
  // throw: true, // 抛出错误，代替设置响应头状态
  // notImplemented: () => '不支持当前请求所需要的功能',
  // methodNotAllowed: () => '不支持的请求方式'
}));

app.listen(4000, () => {
  console.log('server started !');
});
