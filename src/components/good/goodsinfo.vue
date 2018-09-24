<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goodsinfolist.goodsinfo"  class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">

                    <div class="left-925">
                        <div class="goods-box clearfix">

                            <!-- 左边的商品图片 -->
                             <div class="pic-box">
                                 <div class="magnifier" id="magnifier1">
                                  <div class="magnifier-container">
                                    <div class="images-cover"></div>
                                    <!--当前图片显示容器-->
                                    <div class="move-view"></div>
                                    <!--跟随鼠标移动的盒子-->
                                </div>
                                <div class="magnifier-assembly">
                                    <div class="magnifier-btn">
                                        <span class="magnifier-btn-left">&lt;</span>
                                        <span class="magnifier-btn-right">&gt;</span>
                                    </div>
                                    <!--按钮组-->
                                    <div class="magnifier-line">
                                        <ul class="clearfix animation03">
                                            <li v-for="item in goodsinfolist.imglist" :key="item.id">
                                                <div class="small-img">
                                                    <img :src="item.original_path" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <!--缩略图-->
                                </div>
                                <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                 </div>
                            </div>


                            <!-- 商品信息 -->
                            <div class="goods-spec">
                                <h1>{{goodsinfolist.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfolist.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfolist.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfolist.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfolist.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                   <el-input-number v-model="num1" size="small"  :min="1" :max="goodsinfolist.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfolist.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button ref="addshopcartref" @click="addBuyCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <!-- 商品介绍 商品评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li @click="goodShow = true">
                                        <a href="javascript:;" :class="{selected :goodShow }">商品介绍</a>
                                    </li>
                                    <li @click="goodShow= false">
                                        <a href="javascript:;" :class="{selected : !goodShow}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <!-- 内容 -->
                            <div v-show="goodShow"  class="tab-content entry" style="display: block;">
                                <p  v-html="goodsinfolist.goodsinfo.content"></p>
                            </div>
                            <!-- 评论信息 -->
                            <div v-show="!goodShow" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="txtContentRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="postcomment" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 判断如果评论数为0就才显示 -->
                                        <p v-if="goodscommentData.totalcount===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in goodscommentData.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFrmt}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                                <el-pagination
                                                  @size-change="handleSizeChange"
                                                  @current-change="handleCurrentChange"
                                                  :current-page="pageIndex"
                                                  :page-sizes="[2, 5, 10, 20]"
                                                  :page-size="pageSize"
                                                  layout="total, sizes, prev, pager, next, jumper"
                                                  :total="goodscommentData.totalcount">
                                                </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 右边推荐商品 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsinfolist.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFrmt}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- animation动画效果 -->
          <transition
           v-on:before-enter="beforeEnter"
           v-on:enter="enter"
           v-on:after-enter="afterEnter">
         <div ref="imgref" v-show="isShow" v-if="goodsinfolist.imglist" class="imglist">
             <img :src="goodsinfolist.imglist[0].original_path" alt="">
         </div>
     </transition>
        <!-- <transition 
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
        >
        <div ref="imgref" class="imglist" v-show="isShow">
            <img  :src="goodsinfolist.imglist[0].original_path" alt="">
        </div>



        </transition> -->

    </div>
</template>
<style scoped>
    @import '../../statics/site/jqimgzoom/css/magnifier.css';
    .imglist {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .imglist img {
        width: 100%;
        height: 100%;
    }
</style>

<script>
// 放大镜js代码
import  '../../statics/site/jqimgzoom/js/magnifier.js';
import { Affix } from 'iview';
export default {
    // 需要注册
    components : {Affix},
    // data是一个函数 需要有返回值 返回的是一个对象
    // 需要初始化

    data(){
        return{
            goodsinfolist:{}, //商品详情信息
            num1:1, //计数器里面默认值1
            goodShow:false, //点击商品详情跟评论
            pageIndex:1, //默认页码是第一页
            pageSize:2, //每页展示多少条数据
            goodscommentData:{},
            isShow:false,
            // addshopcartoffset:null,
            // shoppingCartCountref:null



        }
    },
    
    created(){
        //{this.$route.params.goodsid} 获取到传过来的id
        // 商品详情信息
        this.goodsinfoData()


        // 评论信息
        this.goodscomment()

       


    },
    watch:{
      $route:function(newValue,oldValue){
         // 商品详情信息
        this.goodsinfoData() 


        // 评论信息
        this.goodscomment()

         // 修改初始值
        this.num1 = 1

      }
  },
    // 处理函数 创建钩子错误就会说goodsinfolist不是一个函数 因为methods 写错了
    // 又是这一步写错了 updated 商品大图展示初始化
    updated(){

        $('#magnifier1').imgzoon({magnifier:'#magnifier1'})
    },
    methods:{
        // 根据商品id获取商品详情数据
        goodsinfoData(){
            const url = `site/goods/getgoodsinfo/${this.$route.params.goodsid}`
            this.$axios.get(url).then(response=>{
                this.goodsinfolist = response.data.message

                setTimeout(() => {
                    // 加入购物车开始偏移位置
                    this.addshopcartoffset = $(this.$refs.addshopcartref).offset()
                    // console.log(this.addshopcartoffset);

                    // 把图片的位置设置到购物车那里
                    $(this.$refs.imgref).offset(this.addshopcartoffset)



                    // 获取购物车结束偏移位置
                    this.shoppingCartCountref = $('#shoppingCartCount').offset()
                    // console.log(this.shoppingCartCountref);
                    
                    
                }, 200);
            })
        },

        // 分页获取评论
        //site/comment/getbypage/goods/102?pageIndex=1&pageSize=1
        //goodsid  :  商品id pageIndex : 当前第几页，默认是1  pageSize：每页显示的条数，默认是10
        goodscomment(){
            const url = `site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            this.$axios.get(url).then(response=>{
                this.goodscommentData = response.data
            })
            
        },

        // 分页 每页多少条
         handleSizeChange(pageSize) {
             this.pageSize = pageSize
             //选了每页多少条之后需要修改当前页
             this.pageIndex = 1
             this.goodscomment()
        },

        // 当前页
        handleCurrentChange(pageIndex) {
            this.pageIndex = pageIndex
            
            this.goodscomment()
        },

        // 提交评论 site/validate/comment/post/goods/102 需要一个id
        //通过 ref 获取vm.$refs.txtContentRef
        //如果提交成功直接调用获取分页评论的函数
        postcomment(){
            // 获取到textarea 里面的内容
            const getcomment = this.$refs.txtContentRef
            // console.log(textcoment);
            
            //  const getcomment = $('#txtContent').val()
            if(getcomment.value.trim().length===0){
                this.$message({
                   showClose: true,
                   message: '您好,评论不能为空哦',
                   type: 'warning'
                 });
                 return
            }

            this.$axios.post(`site/validate/comment/post/goods/${this.$route.params.goodsid}`,{commenttxt:getcomment.value})
            .then(response=>{
                if(response.data.status==0){
                    // 首先清空里面的内容
                    getcomment.value = ''

                    // 提示用户评论成功
                    this.$message({
                        showClose: true,
                        message: '恭喜你，添加成功',
                        type: 'success'
                      });
                    // 然后再获取评论
                    this.goodscomment()
                }
            })     
        },

        // 加入购物车
        addBuyCar(){
            this.isShow = true
            //num1:1, //计数器里面默认值1
            const goods = {goodsId:this.$route.params.goodsid ,count:this.num1}

            // 调用store.commit去触发mutations方法
            this.$store.commit('addGoods',goods)
        },


        // 添加动画
         // 进入中
         // --------


         beforeEnter: function (el) {
             el.style.top = `${this.addshopcartoffset.top}px`
             el.style.left =   `${this.addshopcartoffset.left}px`
             el.style.transform = `scale(1)`
           // ...
         },
         // 此回调函数是可选项的设置
         // 与 CSS 结合时使用
         enter: function (el, done) {
             el.style.transition = "all .5s"
            

            // 添加过渡帧总是写错
             el.offsetWidth

            //  结束位置
            el.style.top = `${this.shoppingCartCountref.top}px`
            el.style.left = `${this.shoppingCartCountref.left}px`
            el.style.transform = `scale(0.5)`
           // ...
           done()
         },
         afterEnter: function (el) {
           // ...
           this.isShow = false
         },




    }   
}
</script>

