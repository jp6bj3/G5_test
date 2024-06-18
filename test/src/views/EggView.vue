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
          <span v-if="!isDispensing">100円</span>
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
        }, 500);
        setTimeout(() => {
          this.isAnimating = false;
          this.isDispensing = false;
          this.isOpen = false;
        }, 2500);
      }
    },
  },
};
</script>

<style scoped>
.gachapon-machine {
  width: 300px;
  height: 500px;
  background-color: #ff99cc;
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
  width: 80%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.capsules-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.capsule {
  width: 30px;
  height: 60px;
  border-radius: 50% 50% 0 0;
  margin: 0 5px;
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
  width: 30px;
  height: 60px;
  border-radius: 50% 50% 0 0;
  position: absolute;
  bottom: -30px;
  transition: transform 1s ease;
}

.dispensed-capsule.animate {
  transform: translateY(-120px);
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