const fs = require('fs')
const rs = fs.createReadStream('./01.png')
const ws = fs.createWriteStream('./02.png')
rs.pipe(ws)