<template>
  <div>
    <h2>扭蛋機</h2>
    <div v-if="!spinning">
      <div v-for="(level, index) in levels" :key="index">
        <label>{{ level.name }}:</label>
        <input type="number" v-model.number="level.ratio" min="0" max="100" required>
      </div>
      <button @click="startSpinning">開始抽獎</button>
    </div>
    <div v-else>
      <p>正在抽獎中...</p>
      <div class="spinner"></div>
    </div>
    <div v-if="result !== null">
      <p>抽獎結果: 球 {{ result.index + 1 }} ({{ result.level }})</p>
      <button @click="reset">再來一次</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levels: [
        { name: '普通', ratio: 6 },
        { name: '尚可', ratio: 6 },
        { name: '好', ratio: 2 },
        { name: '優秀', ratio: 1}
      ],
      balls: [],
      spinning: false,
      result: null
    }
  },
  methods: {
    startSpinning() {
      this.calculateProbabilities()
      this.spinning = true
      this.result = null
      setTimeout(() => {
        this.drawResult()
        this.spinning = false
      }, 2000)
    },
    calculateProbabilities() {
      const totalRatio = this.levels.reduce((sum, level) => sum + level.ratio, 0)
      this.balls = []
      for (let i = 0; i < this.levels.length; i++) {
        const level = this.levels[i]
        const count = Math.floor((level.ratio / totalRatio) * 15)
        for (let j = 0; j < count; j++) {
          this.balls.push({ level: level.name, probability: level.ratio / totalRatio })
        }
      }
    },
    drawResult() {
      const totalProbability = this.balls.reduce((sum, ball) => sum + ball.probability, 0)
      let randomValue = Math.random() * totalProbability
      for (let i = 0; i < this.balls.length; i++) {
        randomValue -= this.balls[i].probability
        if (randomValue <= 0) {
          this.result = { index: i, level: this.balls[i].level }
          break
        }
      }
    },
    reset() {
      this.result = null
    }
  }
}
</script>

<style>
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>