const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class CCHEN {
  constructor() {
    this.middlewares = []
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)
      // this.callback(req, res)

      // 中间件合成
      const fn = this.compose(this.middlewares)
      // 执行合成函数并传入上下文
      await fn(ctx)
      // this.callback(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }
  // use(callback) {
  //   this.callback = callback
  // }
  use(middleware) {
    // 将中间件加到数组里
    this.middlewares.push(middleware)
  }

  // 合成函数
  compose(middlewares) {
    return function (ctx) { // 传入上下文
      return dispatch(0);
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        } 
        return Promise.resolve(
          fn(ctx, function next() {// 将上下文传入中间件，mid(ctx,next)
            return dispatch(i + 1);
          })
        );
      }
    };
  }
  // 构建上下文
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }
}

module.exports = CCHEN