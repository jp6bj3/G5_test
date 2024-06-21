<template>
  <div class="gachapon-machine">
    <div class="machine-body">
      <div class="display">
        <div class="capsules-container">
          <div class="capsule" v-for="capsule in capsules" :key="capsule.id" :style="{ backgroundColor: capsule.color }"></div>
        </div>
      </div>
      <div class="dispenser">
        <div class="capsule-slot" :class="{ 'open': isOpen }">
          <div class="dispensed-capsule" :class="{ 'animate': isAnimating }" :style="{ backgroundColor: dispensedCapsuleColor }"></div>
        </div>
        <button @click="dispenseGachapon">
          <span v-if="!isDispensing">開始抽獎</span>
          <span v-else>がんばれ！</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      capsules: [
        { id: 1, color: '#7CFC00' },
        { id: 2, color: '#FF1493' },
        { id: 3, color: '#FFD700' },
        { id: 4, color: '#00BFFF' },
        { id: 5, color: '#FFD700' },
        { id: 6, color: '#FFD700' },
        { id: 7, color: '#7CFC00' },
        { id: 8, color: '#FF1493' },
        //球球們
        // Add more capsule colors as needed
      ],
      isOpen: false,
      isAnimating: false,
      isDispensing: false,
      dispensedCapsuleColor: '',
    };
  },
  methods: {
    dispenseGachapon() {
      if (!this.isDispensing) {
        this.isDispensing = true;
        const randomCapsuleIndex = Math.floor(Math.random() * this.capsules.length);
        this.dispensedCapsuleColor = this.capsules[randomCapsuleIndex].color;
        this.isOpen = true;
        setTimeout(() => {
          this.isAnimating = true;
          this.shake = true;
        }, 1000);
        setTimeout(() => {
          this.isAnimating = false;
          this.isDispensing = false;
          this.isOpen = false;
        }, 4000);
      }
    },
  },
};
</script>

<style scoped>
.gachapon-machine {
  width: 300px;
  height: 500px;
  background-color: #b5d2fe;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.machine-body {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.display {
  width: 100%;
  height: 200px;
  background-color: #eaf4ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.capsules-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.capsule {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.capsule:nth-child(1) {
 top: 130px;
 left: 150px;
}
.capsule:nth-child(2) {
 top: 130px;
 left: 50px;
}
.capsule:nth-child(8) {
 top: 150px;
 right: 130px;
}
.capsule:nth-child(3) {
 top: 150px;
 right: 180px;
}
.capsule:nth-child(7) {
 top: 160px;
 right: 80px;
}
.capsule:nth-child(6) {
 top: 150px;
 right: 30px;
}
.capsule:nth-child(5) {
 top: 120px;
 left: 120px;
}
.capsule:nth-child(4) {
 top: 120px;
 right: 120px;
}


@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}

.dispenser {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.capsule-slot {
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.capsule-slot.open::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
}

.dispensed-capsule {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom:120px;
  transition: transform 1s;
}

.dispensed-capsule.animate {
  transform: translateY(130px);
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff99cc;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>