<template>
    <div class="about">
        <!-- 兩種取陣列數量的方法 -->
        1. list有{{ list.length }}個<br />
        2. list有{{ count }}個
        <ul>
            <!-- <li v-for="num in itemIndex" :key="num">{{ num }}</li> -->
            <button @click="add">加入</button>
            <li v-for="item in list" :key="item.id">
                <template v-if="item.show">
                    <a :href="item.link" :style="{
                        color: item.color
                    }">
                        {{ item.title }}
                    </a>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemIndex: 2,
            list: [
                {
                    id: 1,
                    title: 'ingrid',
                    color: '#999',
                    show: true,
                    link: 'https://www.google.com'
                },
                {
                    id: 2,
                    title: 'ivy',
                    color: '#888',
                    show: false,
                    link: 'https://www.facebook.com'
                }
            ]
        }
    },
    computed: {
        count() {
            return this.list.length
        }
    },
    methods: {
        add() {
            this.itemIndex += 1
            this.list.push({
                id: this.itemIndex,
                title: `test${this.itemIndex}`
            })
            // this.itemIndex = this.itemIndex + 1
            //
            // console.log(this.list)
        }
    }
}
</script>

<style>
p {
    color: red;
}
</style>
