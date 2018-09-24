<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="(item,index) in shopCartList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isShow" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div style="display:flex;align-items:center;"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- {{item.buycount}} -->
                                        <!-- 父传子通过属性名跟属性值 传值-->
                                        <!-- 子传父是通过自定义事件 -->
                                        <inputnumber :initCount="item.buycount" :goodsId="item.id" @goodsCountChange="getChange" />
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click="deleteGoods(item.id,index)">删除</a>
                                    </td>
                                </tr>

                                <tr v-if="shopCartList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPirce}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="goShoping">继续购物</button>
                            <button class="submit" @click="formSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
// 按需导入getLocalDoods {87: 2, 88: 1}
import { getLocalGoods } from '../../common/localStorageTool.js'

// 导入子组件
import inputnumber from '../inputNumber/inputnumber.vue'

export default {
    // 子组件需要局部注册
    components: { inputnumber },
    data() {
        return {
            shopCartList: []
        }
    },
    // 巧妙利用计算属性
    computed: {
        // 计算商品件数 跟总金额
        getTotalCount() {
            let totalCount = 0
            // 首先总数为0
            // 如果为开的时候才去计算
            this.shopCartList.forEach(goods => {
                if (goods.isShow) {
                    // 这个goods就是返回过来的数据
                    totalCount += goods.buycount
                }
            })
            return totalCount
        },
        getTotalPirce() {
            let totalPirce = 0
            this.shopCartList.forEach(goods => {
                if (goods.isShow) {
                    totalPirce += goods.buycount * goods.sell_price
                }
            })
            return totalPirce
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {

              const localGoods = getLocalGoods()
            // 这一步是把locastorageTool.js里面的数据拿出来
            // 发送请求需要获取到
            const key = Object.keys(localGoods)
            // console.log(key);//["87", "88", "89", "90", "94"]
            // 把key用,拼接
            const url = `site/comment/getshopcargoods/${key.join(',')} `
            this.$axios.get(url).then(response => {
                // console.log(response.data);
                response.data.message.forEach(goods => {
                    goods.buycount = localGoods[goods.id]
                    goods.isShow = true
                })

                this.shopCartList = response.data.message
            })
            // const goodsInfo = getLocalGoods()
            // console.log(goodsInfo) //{87: 11, 88: 9, 89: 2, 90: 3}
            // // 发送请求的话需要传入id 可以拼接   里面还需要一个buycount购买的件数
            // // 获取key值 es6的语法 对象的拓展里面 const keys = Object.keys()
            // const keys = Object.keys(goodsInfo)
            // console.log(keys) //["87", "88", "89", "90"]
            // const url = `site/comment/getshopcargoods/${keys.join(',')}`
            // this.$axios.get(url).then(response => {
            //     //    console.log(response.data.message);
            //     // 这一步不太明白
            //     response.data.message.forEach(goods => {
            //         // console.log(goods);

            //         ;(goods.buycount = goodsInfo[goods.id]),
            //             // 在数据里面添加一个属性
            //             (goods.isShow = true)
            //     })
            //     this.shopCartList = response.data.message
            // })
        },
        // 子组件传值
        // 父组件接收子组件传递过来的参数通过函数形参接收
        getChange(updateinfo) {
            // console.log(updateinfo)
            // 要去遍历shopCartList里面
            this.shopCartList.forEach(goods => {
                // 这里面的goods就是每一条数据
                //判断如果你修改的id跟数据库里面的id是一致的name就把数据库里面的件数修改
                if (goods.id == updateinfo.goodsId) {
                    goods.buycount = updateinfo.count
                }
            })

            // 修改载荷,购物车里面的数据跟着改变
            const goods = {
                goodsId: updateinfo.goodsId,
                count: updateinfo.count
            }
            this.$store.commit('updateGoods', goods)
        },
        // 通过传入的下标 跟id 删除改商品
        deleteGoods(goodsId, index) {
            // console.log(goodsId,index);
            this.shopCartList.splice(index, 1)

            // 调用mutations里面的deleteGoodsById
            this.$store.commit('deleteGoodsById', goodsId)
        },

        // 继续购物
        goShoping() {
            this.$router.push({ name: '/goodslist' })
        },

        // formSubmit 立即结算  需要传递一个id
        formSubmit() {
            // 首先用一个空数组存起来
            const ids = []
            // 比那里goods
            this.shopCartList.forEach(goods => {
                if (goods.isShow) {
                    // 如果是显示的时候才把id放到数组里面
                    ids.push(goods.id)
                }
            })
            if (ids.length == 0) {
                // 如果里面没有id 那么就提示购物车里面没有商品
                this.$message({
                    showClose: true,
                    message: '您的购物车没产品,请去购物商城添加',
                    type: 'warning'
                })
                return
            }
            // 如果有就跳到结算页面
            this.$router.push({path:'/clearorder',query: { ids: ids.join(',') }})

        }
    }
}
</script>
