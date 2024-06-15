<template>
    <div>
        <p v-if="countDown > 0">倒數時間: {{ countDown }}</p>
        <p v-else>時間到！</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            countDown: 10, 
            timer: null
        }
    },
    created() {
        this.startTimer()
    },
    methods: {
    startTimer() {
        this.timer = setInterval(() => {
            if (this.countDown > 0) {
                this.countDown--;
            } else {
                clearInterval(this.timer);
                this.timer = null;
            }
        }, 1000);
    }
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer); 
        }
    }
};
</script>