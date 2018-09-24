/**import Vue from 'vue'
import Vuex from 'vuex'

// 基于Vue的所以要集成
Vue.use(Vuex)
*/

// 创建空仓库

//   导入common里面的本地存储工具 按需引入
// 把本地存储的导入 导入总数 导入修改购物车后的总数跟修改本地存储
//deleteLocalGoods 删除
import { addGoodsLocal, getTotalCount,updateLocalGoods ,deleteLocalGoods} from '../common/localStorageTool'
const store = new Vuex.Store({
  // 存数据
  state: {
    BuyCount: 0
  },
  // 取数据 并把数据返回 相当于是计算属性
  // 通过属性访问 Getter 会暴露为 store.getters 对象
  getters: {
    // 利用箭头函数
    getBuyCount: state => {
      // 这里就是刷新跟没刷新
      return state.BuyCount > 0 ? state.BuyCount : getTotalCount()
    }
  },
  // 提交修改后的数据

  mutations: {
    // goods===doodsid:87 count:10
    // 如果后面count发生改变就应该相加
    addGoods(state, goods) {
      // 需要计算修改后的值 重新新建文件夹 addGoodsLocal保存到本地
      state.BuyCount = addGoodsLocal(goods)
    },
    // 修改购物车
    updateGoods(state,goods){
        state.BuyCount = updateLocalGoods(goods)
    },

    // 删除
    deleteGoodsById(state,goodsId){
      state.BuyCount = deleteLocalGoods(goodsId)
    }
  }
})

// 导出
export default store
