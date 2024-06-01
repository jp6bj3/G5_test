<template>
    <div>
    <!-- <ProductCard :money="pay" :name="child[0]"
    @add="payMoney"/>//子層
    <button @click="payMoney">+100</button>//父層
    <hr> -->
    <button @click="clear">O</button>
     <button @click="filter(1)">X</button>
        <button @click="filter(2)">XX</button>
        <button @click="filter(3)">XXX</button>
        <button @click="filter(4)">XXXX</button>
        <button @click="filter(5)">XXXXX</button>
   <hr>
//手寫
    <ProductCard :item="product[0]" :name="child[0]"/>
        <hr>
    <ProductCard :item="product[1]" :name="child[0]"/>
    <hr>
//v-for
    <div v-if="displayList.length===0">
    loading...
    </div>
    <div v-else>
    <ProductCard v-for="prod in displayList" 
    :key="prod.id"
    :item="prod"/>
    <hr>

</div>
       <p>test</p>
       <!-- 不要加分號 -->
       <img src="@/assets/img/1.png" alt="">

       <!-- 物件導出 要分號 -->
       <img :src="img1" alt="">

        <!--  -->
       <!-- <img :src="parseImg('1.png')" alt=""> -->

       <!-- 變數v-for card -->
       <!-- <div class="card" 
       v-for="item in menu" 
       :key="item.id">
       
       <div>
        <img :src="parseImg(item.img)" alt="">
        </div>
       <div>
        {{ item.name }}
        <span v-for="star in item.rating">o </span>
       </div>
       <div>
        <button>+</button>
    </div>
        </div> -->

        <!-- 相同v-for -->
       <!-- <div class="card" 
       v-for="num in imgs" 
       :key="num"
       :style="{'background-image': `url(${parseImg(num)})`}">
       <p>123444</p>
        </div> -->
         </div>
</template>

<script>
import ProductCard from '@/components/layout/ProductCard.vue'
import img1 from '@/assets/img/1.png'
export default {
    components: {
        ProductCard
    },
    data() {
        return {
            product: [
                {
                id:'1',
                name: '商品名稱',
                price: '1000',
                img: '1.png',
                rating:'4'
                },{
                id:'2',
                name: '商品名稱2',
                price: '12000',
                img: '3.png',
                rating:'2'
                }
            ],
            displayList:[],
            pay: 2000,
            child: ['ingrid'],
            // img1: img1,
            // imgs: ['1.png', '2.jpg', '3.png'],
            menu: [
                {
                id:1,
                name: '商品1',
                img: '1.png',
                price: 100,
                rating:4
                },
                {
                id:2,
                name: '商品2',
                img: '3.png',
                price: 100,
                rating:5
                },
            ]
        }
    },
    mounted() {
        fetch("/product.json")
        .then(data => data.json())
        .then(res => {
            this.product = res
            this.displayList = res
        })
    },
    methods: {
        clear() {
            this.displayList = this.product
        },
        parseImg(file) {
            //指到 src || 不能@ 要../回到上一層
            return new URL(`../assets/img/${file}`, import.meta.url).href
        },
        payMoney(){
            this.pay += 100;
        },
        filter(star){
            console.log(star);
            this. displayList = this.product.filter(item => {
                return item.rating===star;
                // console.log(item)
            })
        }
    }
}
</script>

<style lang="scss">
img{
    height: 5rem;
}
.card{
    width: 20rem;
    height: 20rem;
    background-image: url('@/assets/img/1.png');
    background-size: cover;
}

</style>