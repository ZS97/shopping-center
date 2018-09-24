// 定义一个本地存储的key
const key = 'goods'

// 先取出本地已有的数据
// 一进来的时候就判断有没有key 如果有就
const getLocalGoods = () => {
  // 如果有那么就是key会转为对象 没有就是'{}'
  //是做拼接如果没有这个相同的key那么就添加
  return JSON.parse(localStorage.getItem(key) || '{}')
}

// 计算总数
const getTotalCount = () => {
  //{87:3,88:2}
  const localGoods = getLocalGoods()
  // 计算 需要用let
  let totalCount = 0
  // 遍历key获取到的是每个value 相加
  for (const key in localGoods) {
    totalCount += localGoods[key]
  }
  return totalCount
}

/**供Vuex调用的，把商品存储到本地 */
/**
 * {goodsId:90,count:2}
 *
 *  key                     value
 * goods                   {87:3,88:2}
 * id作为key，数量作为value，但是如果原先key存在数量要累加
 */
const addGoodsLocal = goods => {
  // console.log(goods) //{goodsId: "87", count: 2}

  // 把goods中的商品存储到本地
  // localGoods === {87:3,88:2,92:2}

  // 加入购物车
  // addBuyCar(){
  //     this.isShow = true
  //     //num1:1, //计数器里面默认值1
  //     const goods = {goodsId:this.$route.params.goodsid ,count:this.num1}

  //     // 调用store.commit去触发mutations方法
  //     this.$store.commit('addGoods',goodsId)
  // },

  // {goodsId: "87", count: 2}
  // 计算count的值

  const localGoods = getLocalGoods()

  // 就是key有值那么应该就把value累加
  if (localGoods[goods.goodsId]) {
    //key = value
    localGoods[goods.goodsId] += goods.count
  } else {
    localGoods[goods.goodsId] = goods.count
  }
  //   console.log(localGoods) //{87:1} 走了下面那条
  //   console.log(localGoods)//如果多次加入 那么就是 {87: 2, 88: 1}
  //  设置本地存储

  //   转化为字符串形式 开始存的是对象
  localStorage.setItem(key, JSON.stringify(localGoods))
  //console.log(localStorage.getItem(key));//{"87":6,"88":9,"89":2}

  // 应该要遍历并且计算 计算总数 然后返回
  return getTotalCount()
}

// 修改购物车并把总数返回 跟修改本地存储
const updateLocalGoods = goods => {
  // {goodsId: "87", count: 2}
  // 计算count的值
  const localGoods = getLocalGoods()
  // 应该是把修改了的赋值给原来的goodsId
  localGoods[goods.goodsId] = goods.count

  localStorage.setItem(key, JSON.stringify(localGoods))
  // 应该要遍历并且计算 计算总数 然后返回
  return getTotalCount()
}

// 删除数据通过id 删除对应的id 并把
const deleteLocalGoods = goodsId => {
  // {goodsId: "87", count: 2}
  // 计算count的值
  const localGoods = getLocalGoods()
  delete localGoods[goodsId]

  localStorage.setItem(key, JSON.stringify(localGoods))
 

  // 应该要遍历并且计算 计算总数 然后返回
  return getTotalCount()
}

// 按需导出  忘记把添加总数导出
//getTotalCount计算总数
//getLocalDoods {87: 2, 88: 1}
//updateLocalGoods修改后的总数跟修改本地存储
//deleteLocalGoods 通过id 删除
export {
  addGoodsLocal,
  getTotalCount,
  getLocalGoods,
  updateLocalGoods,
  deleteLocalGoods
}

// 按需导出
