const add = (x, y) => x + y
const square = z => z * z
 
// 同步两个函数组合
// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// 同步多个函数组合
// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }

// 方式二：
// const compose = function (...fns) {
//   return function (arr) {
//     return fns.reduce(function (val, fn) {
//       return fn(val)
//     }, arr)
//   }
// }
// 或
// const compose = (...fns) => arr => fns.reduce((val, fn) => fn(val), arr)

// const fn = compose(add, square)
// console.log(fn(2, 3));



// 异步多个函数组合
function compose(middlewares) {
  return function () {
    return dispatch(0) // 执行第0个
    function dispatch(i) {
      let fn = middlewares[i]
      if(!fn) {
        return Promise.resolve
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}
async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('end fn1'); 
}
async function fn2(next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2'); 
}
function fn3(next) {
  console.log("fn3");
}
async function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000);
  })
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();


