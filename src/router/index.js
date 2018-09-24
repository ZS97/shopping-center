/**import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from 'axios'
// 集成完
Vue.use(VueRouter)
*/


// 解决axios发送请求的两个问题 一个是每个文件都需要导入这个包 每次都需要手动拼接地址,后期维护只需要改一个地方
// 设置了baseURL就是全局的了会自动拼接后面的地址
// 把axios 跟路径处理一下  挂载到Vue原型上
// import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials = true
// 安全证书需要添加这个
Vue.prototype.$axios = axios

// 需要导入父子组件通信
import { bus } from '../common/common'
/**
// 导入路由 导入商品组件
import goodslist from '../components/good/goodslist.vue'

// 商品详情组件
import goodsinfo from '../components/good/goodsinfo.vue'

// 购物车组件
import shopcartinfo from '../components/shopCart/shopcartinfo.vue'

// 立即结算组件
import clearorder from '../components/order/clearOrder.vue'

// 登录页面
import login from '../components/account/login.vue'

// 订单页面
import pay from '../components/pay/pay.vue'

// 订单支付成功组件
import paySuccess from '../components/pay/paySussecc.vue'

// 个人中心
import vipcenter from '../components/vipcenter/vipcenter.vue'

// 查询订单
import orderlist from '../components/vipcenter/orderlist.vue'

// 查看订单
import orderInfo from '../components/vipcenter/orderInfo.vue'
 */


// 导入路由 导入商品组件
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/good/goodslist.vue')

// 商品详情组件
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/good/goodsinfo.vue')

// 购物车组件
const shopcartinfo = () => import(/* webpackChunkName: "shopcartinfo" */ '../components/shopCart/shopcartinfo.vue')

// 立即结算组件
const clearorder = () => import(/* webpackChunkName: "clearorder" */ '../components/order/clearOrder.vue')

// 登录页面
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')

// 订单页面
const pay = () => import(/* webpackChunkName: "pay" */ '../components/pay/pay.vue')

// 订单支付成功组件
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySussecc.vue')

// 个人中心
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '../components/vipcenter/vipcenter.vue')

// 查询订单
const orderlist = () => import(/* webpackChunkName: "orderlist" */ '../components/vipcenter/orderlist.vue')

// 查看订单
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vipcenter/orderInfo.vue')


// 创建路由
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/goodslist' },
    // 组件 component不要写错 给继续购物添加name 跳到goodslist页面
    { name: '/goodslist', path: '/goodslist', component: goodslist },
    // 需要动态添加一个id
    { path: '/goodsinfo/:goodsid', component: goodsinfo },
    // 商品详情
    { path: '/shopcart', component: shopcartinfo },

    // 登录页面
    { path: '/login', component: login },
    // 结算清单页面
    { path: '/clearorder', meta: { needLogin: true }, component: clearorder },

    // 订单页面
    {path:'/pay',meta: { needLogin: true },component:pay},

    // 订单成功页面 也是需要登录的
    {path:'/paySuccess',meta: { needLogin: true },component:paySuccess},

    // 个人中心
    {path:'/vipcenter',meta: { needLogin: true },component:vipcenter},

    // 订单查询
    {path:'/orderlist',meta: { needLogin: true },component:orderlist},

    // 查看订单
    {path:'/orderInfo/:orderid',meta: { needLogin: true },component:orderInfo},
  ]
})
//全局守卫
router.beforeEach((to, from, next) => {
  // // ...
  // console.log(to)
  // console.log(from);
  
  // 保存起来你想去的页面
  if (to.fullPath != '/login') {
    localStorage.setItem('isvisitlogin', to.fullPath)
  }
  // console.log(from);
  // next()

  // 解决一刷新就又会变成登录
  // 应该把每个页面都判断一次
  if(to.path){
    // console.log(to);
    
    axios.get( `site/account/islogin`).then(response=>{
      //"code":"logined"
      if(response.data.code==='logined'){
        bus.$emit('loginChange') //如果成功的话也需要去触发这个事件
      }else{
        // 如果没有登录应该是让他跳转到登录页面
        
      }
    })
  }
  // 如果包含meta.needLogin
  if (to.meta.needLogin) {
    // 发送请求
    const url = `site/account/islogin`
    axios.get(url).then(response => {
      // 如果返回的格式是"code":"logined" 那么就放行,不然就跳到登录页面
      if (response.data.code === 'logined') {
        bus.$emit('loginChange') //如果成功的话也需要去触发这个事件
        next()
      } else {
        // 跳到登录页面
        router.push({ path: '/login' })
      }
    })
  } else {
    next()
  }
})

// 导出
export default router
