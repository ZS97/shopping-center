<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{payInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{payInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{payInfo.area}}{{payInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{payInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{payInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{payInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <dzh-qrcode :url="url" :img_url="img_url"></dzh-qrcode>
                                    <canvas width="300" height="300"></canvas>
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
import DZHQRCode from 'dzh-qrcode'
import Vue from 'vue'
// 全局注册
// Vue.use('dzh-qrcode', DZHQRCode)
export default {
    // components: { "dzh-qrcode":DZHQRCode },//这里是局部注册
    components: { 'dzh-qrcode': DZHQRCode },
    data() {
        return {
            payInfo: {},
            url: '',
            interval: -1
        }
    },
    created() {
        this.pay()
        this.getPaySuccess()
        this.img_url = require('../../statics/images/alipay.png')
    },
    mounted() {
        this.url = `http://47.106.148.205:8899/site/validate/pay/alipay/${
            this.$route.query.orderid
        }`
    },
    // 如果状态成功后那么就让他页面快死亡的时候跳转,进入销毁阶段的时候
    beforeDestroy() {
        clearInterval(this.interval)
    },
    methods: {
        pay() {
            const url = `site/validate/order/getorder/${
                this.$route.query.orderid
            }`

            this.$axios.get(url).then(response => {
                if (response.data.message[0].status === 2) {
                    this.$router.push({ path: '/paySuccess' })
                } else {
                    // console.log(response.data.message[0])
                    this.payInfo = response.data.message[0]
                    // this.url = `http://47.106.148.205:8899/site/validate/pay/alipay/${
                    //     this.$route.query.orderid
                    // }`
                }
            })
        },

        // 通过计时器去轮询订单状态
        // 如果订单状态为2才跳到订单支付成功页面
        getPaySuccess() {
            this.interval = setInterval(() => {
                const url = `site/validate/order/getorder/${
                    this.$route.query.orderid
                }`

                this.$axios.get(url).then(response => {
                    if (response.data.message[0].status === 2) {
                        this.$router.push({ path: '/paySuccess' })
                    }
                })
            }, 3000)
        }
    }
}
</script>
