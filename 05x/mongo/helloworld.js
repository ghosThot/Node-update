(async () => {
  const MongoClient = require("mongodb").MongoClient;
  const client = new MongoClient(
    'mongodb://localhost:27017',
    {
      useNewUrlParser: true
    }
  )
  let ret

  // 创建连接
  ret = await client.connect()
  const db = client.db('test')
  console.log(db);
  
  const animals = db.collection('animals')
  console.log('ani',animals);
  // 插入
  // ret = await animals.insertOne({
  //   name: '芒果23',
  //   price: 30.3345
  // })
  // console.log('插入成功', JSON.stringify(ret));

  // 查询
  ret = await animals.find({name:'fish'}).toArray()
  console.log('查询', JSON.stringify(ret))
  
  
  
})()