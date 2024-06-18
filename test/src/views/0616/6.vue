<template>
  <div>
    {{ $route.params.id }}<br>
    {{ $route.params.name }}<br>
    {{ $route.params.id }}<br>
    {{ productInfo }}
    {{ productInfo.name }}

  </div>
  <hr>
  <div>
    <h3>熱門排序:</h3>
    <router-link v-for="item in displayData.slice(0, 9)" :key="item.id" :to="`/5/${item.id}`">
      <ProductCard1 :item="item" />
    </router-link>
  </div>

</template>

<script>
import ProductCard1 from '@/components/layout/ProductCard1.vue';

export default {
    components: {
        ProductCard1
    },
    data() {
        return {
            responseData: [],
            displayData: [],
            productInfo: {}
        }
    },
   
    methods: {
        fetchProduct() {
            fetch("../../../public/product.json")
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this.responseData = json;
                    const sortedData = json.sort((a, b) => b.rating - a.rating);
                    this.displayData = sortedData;
                });
        },
        fetchInfo(){
            fetch("../../../public/product.json")
            .then(res => res.json())
            .then(json => {
                // 確認有沒有response
                this.productInfo = json.find(item =>
                {
                return item.id == this.$route.params.id
                })
            })
            .catch((error) => {
                console.log(`error: ${error}`);
            })
        }
    },
    watch: {
        '$route.params.id': {
            handler(newObj) { // newObj會是更動後的參數 
                console.log(newObj);
                this.fetchInfo()
            },
            deep: true
        }
    },
    mounted() {
        this.fetchInfo()
        this.fetchProduct()
    },
}

</script>


<style>
.container{
background: #000;
width: 100px;
height: 100px;
}
</style>