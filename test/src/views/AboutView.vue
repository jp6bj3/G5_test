<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->

    1.list有{{ list.length }}個
    2.list有{{ count }}個
    <!-- 2個都可以，但推薦下面寫法(資料一多就要注意) -->
    <ul>
      <button @click="add">加入</button>
      <li v-for="num in page" :key="num">{{ num }}</li>
      <li v-for="item in list" :key="item.id">
        <template v-if="item.show">
          <a 
          :href="item.link" 
          :style="{ color: 'red' }">
          {{ item.title }}</a>
        </template>
      </li>
    </ul>
  </div>
</template>
<!-- @mouseenter -->
<!-- @mouseleave -->
<!-- @click -->
<script>
export default {
  data() {
    return {
      page: 2,
      list: [
        {
          id: 1,
          title: 'sss',
        link: 'https://www.google.com'
        },
        {
          id: 2,
          title: 'sfff',
         link: 'https://www.google.com'
        }
      ]
    }
  },
  methods: {
    add() {
      this.page += 1
      this.list.push({
        id: this.page,
        title: `test${this.page}`,
        show: true
      })
      // console.log(this.list);
    }
  },
  computed: {
    count() {
      return this.list.length
    }
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
p{
  color: saddlebrown;
}
</style>
