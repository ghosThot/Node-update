// const http = require('http')
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.end('hello world 2x')
// })
// server.listen(3030, () => {
//   console.log('监听端口 3030');
  
// })


// koa 实现
const CCHEN = require('./cchen')
const app = new CCHEN()
// app.use((req, res) => {
//   res.statueCode = 200
//   res.end('hello world koa 2x')
// })
// app.use(ctx => {
//   ctx.body = '123 go'
// })
app.listen(3000, () => {
  console.log('监听端口 3000');
})


const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "5";
});
app.use(async (ctx, next) => {
  ctx.body += "2";
  await delay();
  await next();
  ctx.body += "4";
});
app.use(async (ctx, next) => {
  ctx.body += "3";
});