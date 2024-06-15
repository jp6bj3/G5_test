<template>
    <div class="container">
        
    </div>
    <div>
        {{ $route.params.id }}
        {{ poroductInfo.item }}
    </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
    mounted() {
        this.fetchInfo(){
            fetch("/test/public/product.json")
                .then(res => res.json())
                .then(json => {
                    // 確認有沒有response
                    this.producInfo = json.find(item => { item.id === this.$route.params.id })
                    console.log(json.producInfo);
                })
                .catch((error) => {
                    console.log(`error: ${error}`);
                })
        }
    },
    methods: {
        fetchInfo() {
            this.poroductInfo = {
                item:"test"
            }
        }
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