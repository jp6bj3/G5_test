

<script steup>
// 路徑需要確認

import { ref, onMounted, onBeforeMount } from 'vue'
const counDown = ref(60)// 倒數的秒數 
const timer = ref(null)// 定時器的引用
//return的值 const

const startTimer = () => { 
    //引入const
    timer.value = setInterval(() => { 
            if (this.countDown > 0) { 
            // 時間未到，減一秒 
            this.countDown--; 
            } else { 
            // 時間到，清除計時器 
            clearInterval(this.timer);
            this.timer = null;
            }
        }, 1000);
}
const onBeforeMount() { 
    // vue實體銷毀前，關掉這一頁面 
    if (timer.v) { 
      clearInterval(this.timer); // 防止記憶體洩漏，清除定時器 
    }
  },
onMounted(()=>{
    startTimer()
})
export default {

 
  methods:{
    startTimer() { 
      this. // 每秒執行一次進入作用域
    }
  }
}
</script>

<template>
  <main class="home">
    <h1>{{ countDown }}</h1>
    <section>最新消息</section>
  </main>
</template>

<style lang="scss">
// @import "@/assets/scss/page/home.scss";

</style>
