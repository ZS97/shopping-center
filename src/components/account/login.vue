<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" v-model="user_name" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" v-model="password" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {bus} from '../../common/common.js'
export default { 
    data() {
        return {
            user_name: '',
            password: ''
        }
    },
    methods: {
        login() {
            // 发送请求跳到我想去的地方
            const url = `site/account/login`
            this.$axios.post(url, {
                    user_name: this.user_name,
                    password: this.password
                })
                .then(response => {
                    // console.log(response.data.message)
                    if (response.data.status === 0) {
                        // 表示登录成功
                        //跳到想去的地方就是本地存储的那个路径 key记得要加单引号''
                        this.$router.push({
                            path: localStorage.getItem('isvisitlogin')
                        })
                        bus.$emit('loginChange'); //bus触发事件
                    }
                })
        },

    }
}
</script>
