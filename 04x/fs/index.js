const fs = require('fs')

function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key])
  })
}

function set(key, value) {
  fs.readFile('./db.json', (err ,data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = value
    fs.writeFile('./db.json', JSON.stringify(json), (err, data) => {
      if (err) {
        console.log('err',err)
      }
      console.log('写入成功！！')
    })
  })
}


// 命令行接口部分
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  const [opt, key, value] = input.split(' ')
  console.log(opt, key, value);
  
  if (opt === 'get') {
    get(key)
  } else if (opt === 'set') {
    set(key, value)
  } else if (opt === 'quit') {
    rl.close()
  } else {
    console.log('没有该方法！！')
  }
})

rl.on('close', () => {
  console.log('程序结束！！！')
  process.exit(0)
  
})