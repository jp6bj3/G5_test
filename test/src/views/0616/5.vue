<template>
  <div class="product">
    <header>
      <input type="text" v-model="search" />
      <br />
      <button @click="clear">全部</button>
      <button v-for="starCount in 5" :key="starCount" @click="filterRating(starCount)">
        <span v-for="star in starCount" :key="star">🌟</span>
      </button>
    </header>

    <div v-if="responseData.length === 0">loading...</div>
    <div v-else-if="paginatedItems.length === 0">nodata...</div>
    <div v-else class="product_container">
      <ProductCard v-for="item in paginatedItems" :key="item.id" :item="item" />
    </div>

    <div v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/layout/ProductCard1.vue';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      responseData: [],
      displayData: [],
      search: '',
      currentPage: 1,
      itemsPerPage: 2,
    };
  },
  mounted() {
    this.fetchProduct();
    this.filterData();
  },
  computed: {
    topFourProduct() {
      console.log('topFourProduct');
      return this.responseData.slice(0, 4);
    },
    totalPages() {
      return Math.ceil(this.displayData.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.displayData.slice(startIndex, endIndex);
    },
  },
  watch: {
    search: {
      handler(newValue) {
        this.filterData();
      },
    },
  },
  methods: {
    fetchProduct() {
      fetch('../../../public/product.json')
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.responseData = json;
          this.displayData = json;
        });
    },
    clear() {
      this.search = '';
      this.displayData = this.responseData;
      this.currentPage = 1;
    },
    filterRating(star) {
      this.displayData = this.responseData.filter((item) => {
        return item.rating === star;
      });
      this.currentPage = 1;
    },
    filterData() {
      console.log(this.search);
      this.displayData = this.responseData.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style lang="scss">
.product {
  max-width: 35.5rem;
  margin: 2rem auto;

  &_container {
    display: inline-flex;
    width: 100%;
    gap: 0.5rem;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: 1rem auto;
  }
}
</style>