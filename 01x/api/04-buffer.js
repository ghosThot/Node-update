// 创建一个12字节的以0为填充
const buf1 = Buffer.alloc(12)
console.log(buf1);

// 创建一个buffer 包含ASCII
const buf2 = Buffer.from('c')
console.log(buf2);

const buf3 = Buffer.from('中文编码') // UTF-8
console.log(buf3);

// 拼接
const buf4 = Buffer.concat([buf2, buf3])
console.log(buf4, buf4.toString());


