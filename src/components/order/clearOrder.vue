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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <!-- prop是验证  v-model=" order.accept_name" 表单获取里面的值-->
                                <el-form status-icon :model="order" :rules="rules" ref="orderForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input style="width:400px" v-model=" order.accept_name"></el-input>
                                    </el-form-item>

                                    <el-form-item label="详细地区:" prop="area">
                                        <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                        <!-- <el-input style="width:400px" v-model=" order.area"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="详细地址:" prop="address">
                                        <el-input style="width:400px" v-model=" order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码:" prop="mobile">
                                        <el-input style="width:400px" v-model=" order.mobile"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item label="联系电话:" prop="accept_name">
                                        <el-input style="width:400px" v-model=" order.accept_name"></el-input>
                                    </el-form-item> -->
                                    <el-form-item label="收货人邮箱:" prop="email">
                                        <el-input style="width:400px" v-model=" order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码:" prop="post_code">
                                        <el-input style="width:400px" v-model=" order.post_code"></el-input>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->

                                <label>
                                    <el-radio-group v-model="order.payment_id">
                                        <el-radio :label="6">在线支付
                                            <em>手续费：0.00元</em>
                                        </el-radio>

                                    </el-radio-group>
                                </label>
                                <!-- <label>
                                        <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                        <input name="payment_price" type="hidden" value="0.00">在线支付
                                        <em>手续费：0.00元</em>
                                    </label> -->

                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>

                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group v-model="order.express_id">
                                        <el-radio @change="order.expressMoment=20" :label="1">顺丰快递
                                            <em>费用：20元</em>
                                        </el-radio>
                                        <el-radio @change="order.expressMoment=10" :label="2">圆通快递
                                            <em>费用：10元</em>
                                        </el-radio>
                                        <el-radio @change="order.expressMoment=8" :label="3">韵达快递
                                            <em>费用：8元</em>
                                        </el-radio>
                                    </el-radio-group>
                                </li>
                                <!-- <li>
                                    <label>
                                        <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em>
                                        <span class="Validform_checktip"></span>
                                    </label>
                                </li> -->
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodslist" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}.00
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price*item.buycount}}.00
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="order.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{goodsAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="submitOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
    components: { VDistpicker },
    // 计算属性
    computed: {
        goodsAmount() {
            this.order.goodsAmount = this.totalPrice + this.order.expressMoment
            return this.totalPrice + this.order.expressMoment
        }
    },
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'))
            }
            // 用正则匹配
            // 13345678843
            var reg = /^1[2,3,4,5,6,7,8,9][0-9]{9}$/
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的电话号码'))
                } else {
                    callback()
                }
            }, 1000)
        }
        return {
            // 产品列表
            goodslist: [],
            // 表单需要传递的值
            totalCount: 0, //总数量
            totalPrice: 0,
            // goodsAmount:0, //总金额
            order: {
                accept_name: '张三', //收货人
                area: {
                    //收获地址
                    // 所属地区
                    province: {
                        value: '河北省',
                        code: '130000'
                    },
                    city: {
                        code: '130200',
                        value: '唐山市'
                    },
                    area: {
                        code: '130203',
                        value: '路北区'
                    }
                },
                address: '爱国路', //收获地址
                mobile: '13834369438', //收货人手机号码
                email: 'chenhuasvip@163.com', //邮箱地址
                post_code: '350011', //邮编
                payment_id: 6, //在线支付方式
                express_id: 1, //运送方式
                message: '请快点发货', //订单备注信息
                expressMoment: 20, //快递费
                goodsAmount: 0 //商品总额
            },
            // 表单规则
            rules: {
                accept_name: [
                    {
                        required: true,
                        message: '请输入收货人姓名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                area: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'change'
                    }
                ],
                mobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' }
                ],
                post_code: [
                    {
                        required: true,
                        message: '请输入邮政编码',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    created() {
        this.getGoodsInfo()
    },

    methods: {
        onSelected(data) {
            this.order.area = data
        },
        getGoodsInfo() {
            const url = `site/validate/order/getgoodslist/${
                this.$route.query.ids
            }`
            const localGoods = JSON.parse(localStorage.getItem('goods') || '{}')

            // 设置goodsids,购买商品对象 与cargoodsobj,商品对象key=value
            this.order.goodsids = this.$route.query.ids

            // 商品对象
            const cargoodsobj = {}
            // [87,88]
            const ids = this.order.goodsids.split(',')
            ids.forEach(key => {
                cargoodsobj[key] = localGoods[key]
            })
            this.order.cargoodsobj = cargoodsobj

            // {87: 3, 93: 3, 94: 2, 97: 2, 102: 2, 103: 1}
            // const key = Object.keys(localGoods)
            // console.log(key);// ["87", "93", "94", "97", "102", "103"]
            this.$axios.get(url).then(response => {
                response.data.message.forEach(goods => {
                    // 修改里面的buycount的数量
                    goods.buycount = localGoods[goods.id]

                    this.totalCount += goods.buycount
                    this.totalPrice += goods.buycount * goods.sell_price
                })
                this.goodslist = response.data.message
            })
        },
        submitOrder() {
            // this.$refs.orderForm.validate((valid) => {
            //        if (valid) {
            //         alert('submit!')
            //     } else {
            //         this.$message({
            //             message: '请检查信息是否填写完整'
            //         })
            //     }
            // })
            this.$refs.orderForm.validate(valid => {
                if (valid) {
                    // console.log(this.order);
                    
                    //1.调用后台的接口
                    const url = 'site/validate/order/setorder'

                    this.$axios.post(url, this.order).then(response => {
                        if (response.data.status === 0) {
                            // 2.带上订单跳转到支付页面
                            this.$router.push({
                                path: '/pay',
                                query: {
                                    orderid: response.data.message.orderid
                                }
                            })

                            // 3.删除本地已经下单的商品
                            const ids = this.order.goodsids.split(',')
                            ids.forEach(id => {
                                this.$store.commit('deleteGoodsById', id)
                            })
                        }
                    })
                } else {
                    this.$message.error('信息必须填写完整!')
                }
            })
        }
    }
}
</script>

