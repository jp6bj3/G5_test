<template>
{{count}}
</template>

<script>
export default {
  data() {
    return {
      count: 100
    };
  },
  created() {
    this.count = 200
    },
  mounted() {
        this.count = 300
    },
    methods: {
        
    },
}
</script>