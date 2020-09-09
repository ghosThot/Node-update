const fs = require('fs')

// 同步读取
const data = fs.readFileSync('./config.js')
console.log('data', data.toString());

// 异步读取
// const data2 = fs.readFile('./config.js', (err, data) => {
//   if (err) throw err
//   console.log('data2', data.toString());
// })

// fs promises API node v10
// const fsp = fs.promises
// fsp
//   .readFile('./config.js')
//   .then(data => console.log('fsp', data.toString()))
//   .catch(err => console.log(err))

// promisify async await
(async () => {
  const fs = require('fs')
  const { promisify } = require('util')
  const readFile = promisify(fs.readFile)
  const data3 = await readFile('./config.js')
  console.log('data3', data3.toString());
  
})()

