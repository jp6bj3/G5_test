<template>
    <div>
       <!-- <div class="card" 
       >
       <div>
        <img :src="parseImg( product.img)" alt="">
        </div>
       <div>
        {{  product.name }}
        <span v-for="star in  product.rating">o </span>
        {{  product.price }}
       </div>
       <div>
        <button @click="$emit('add')">+100</button>
        {{money}}
        {{ name }}
    </div>
        </div> -->

    

    <div v-if="item">
        <RouterLink :to="`/5/${item.id}`">

        {{ item.name || ''}}
        {{ item.price || 0}}
        <span 
        v-for="star in item.rating" :key="star">X</span>
        <img v-if="item.img" :src="parseImg(item.img)">
        </RouterLink>
        <button @click="addCard(item)">加入購物車
        </button>
       
    </div>
         </div>
</template>

<script>
import { mapActions } from 'pinia'
import {RouterLink} from 'vue-router';

export default {
    props: ['item'],
     
    data() {
        return {
            // img1: img1,
            // imgs: ['1.png', '2.jpg', '3.png'],
            // product:
            //     {
            //     id:1,
            //     name: '商品1',
            //     img: '1.png',
            //     price: 100,
            //     rating:4
            //     }
        }
    },
    methods: {
        parseImg(file) {
            //指到 src || 不能@ 要../回到上一層
            return new URL(`../../assets/img/${file}`, import.meta.url).href
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