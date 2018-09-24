<template>
      <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="item in goodslistData.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">
                        {{subitem.title}}&nbsp;
                      </span>
                      
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a  href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                       
                      </dd>
                    </dl>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>

          <!--幻灯片 海报-->
         <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px" arrow="always">
                                    <el-carousel-item v-for="slideitem in goodslistData.sliderlist" :key="slideitem.id">
                                    <img :src="slideitem.img_url" alt="">
                                    </el-carousel-item>
                                    </el-carousel>
                            </div>
                        </div>
                    </div>
          <!--/幻灯片 右边内容-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item,index) in goodslistData.toplist" :key="item.id">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | dateFrmt}}</span>
                </div>
              </li>
             
            
              
             
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 下面的产品展示列表 -->
    <div class="section" v-for="item in goodsgroup" :key="item.id">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a v-for="subitem in item.level2catelist" :key="subitem.id" href="/goods/43.html">{{subitem.subcatetitle}}</a>
          
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="goodsdataitem in item.datas" :key="goodsdataitem.id">
              <router-link :to="'/goodsinfo/'+goodsdataitem.artID" class="">
                <div class="img-box">
                  <img v-lazy="goodsdataitem.img_url">
                </div>
                <div class="info">
                  <h3>{{goodsdataitem.artTitle}}</h3>
                  <p class="price">
                    <b>{{goodsdataitem.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{goodsdataitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{goodsdataitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
 
  </div>
</template>

<style scoped>
 .el-carousel__container {
        width: 341px;
        height: 341px;
    }
    .el-carousel__container img{
        width: 100%;
        height: 100%;
    }
    
</style>

<script>

export default {
    data(){
        return{
            goodslistData:{},
            goodsgroup:[]
        }
    },
    created(){
        this.goodslist(),
        this.goodsgroupList()
    },
    // 处理函数
    methods:{
        // 获取商品首页顶部的 轮播图，置顶，分类导航数据
        goodslist(){
            const url = `site/goods/gettopdata/goods`
            this.$axios.get(url).then(response=>{
                this.goodslistData = response.data.message
            })
        },

        // 商品首页按照分类分组获取数据
        goodsgroupList(){
            this.$axios.get(`site/goods/getgoodsgroup`).then(response=>{
                this.goodsgroup = response.data.message
            })
        }
    }
}
</script>

