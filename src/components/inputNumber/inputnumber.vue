<template>
     <div>
        <div class="left" @click="updata">-</div>
        <div class="middle">{{count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<style scoped>
.left,
.middle,
.right {
  display: inline-block;
  border: 1px solid rgba(92, 92, 92, 0.3);
  width: 25px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.middle {
  width: 30px;
  margin: 0 4px;
}
</style>

<script>
export default {
  // 应该通过父组件传过来的不能直接修改父组件传过来的
  // 父组件传值 传过来的属性名是initCount 然后属性值要是number类型
  // 接收到父组件传递过来的属性值

  props: {
    initCount: Number,
    goodsId:Number
  },
  // 等
  created() {
    // 赋值给当前的变量 
    this.count = this.initCount
  },
  data() {
    return {
      count: 1
    }
  },
  // 处理函数
  methods: {
    updata() {
      // 如果长度为1那么不执行
      if (this.count == 1) return
      this.count--
      this.notify()
    },
    add() {
      this.count++
      this.notify()
    },
    // 将子组件修改后的值,传递给父组件 定义自定事件 传递载荷
    notify() {
      const updateinfo = {
        goodsId: this.goodsId,
        count: this.count
      }

      // 子-传-父 通过自定义事件 参数一是事件参二是值
      this.$emit('goodsCountChange', updateinfo)
    }
  }
}
</script>
