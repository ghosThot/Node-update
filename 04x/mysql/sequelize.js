(async () => {
  const Sequelize = require('sequelize')

  // 建立连接
  const sequelize = new Sequelize('mysql', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false // 仍可通过传入 operators map 至operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
  })

  // 定义模型
  const Fruit = sequelize.define('fruit', {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  // 同步到数据库
  let ret = Fruit.sync()
  console.log('sync', ret)

  ret = await Fruit.create({
    name: 'banana',
    price: 3.6
  })
  console.log('create', ret)

  ret = await Fruit.findAll()
  await Fruit.update(
    { price: 4 },
    { where: { name: 'banana' } }
  )
  console.log('findAll', JSON.stringify(ret))
  const Op = Sequelize.Op;
  ret = await Fruit.findAll({
    // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
    where: { price: { [Op.lt]: 5, [Op.gt]: 2 } }
  })
  console.log('findAll', JSON.stringify(ret, '', '\t'))
})()