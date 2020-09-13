const Koa = require('koa')
const app = new Koa()
app.use(async (ctx,next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(`请求${ctx.url}耗时-- ${parseInt(end - start)}ms`);
  
})
app.use(ctx => {
  const expires = Date.now() + 100
  while (Date.now() < expires) {
    ctx.body = [{
      name: 'cchen'
    }]
    
  }
})
app.listen(3000)