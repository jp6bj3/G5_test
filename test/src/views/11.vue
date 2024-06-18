<template>
  <div id="app" ref="app">
    <div class="container">
      <div class="game-layer">
        <div class="machine-container" ref="machine">
          <div class="backboard"></div>
          <div class="balls" ref="balls"></div>
          <img class="machine" src="https://assets.codepen.io/2509128/gotcha.svg" />
          <div class="title"></div>
          <div class="price"></div>
          <img class="handle" ref="handle" src="https://assets.codepen.io/2509128/handle.svg" />
          <div class="pointer" ref="pointer">
            <img src="https://assets.codepen.io/2509128/point.png" />
          </div>
        </div>
      </div>
      <div class="ui-layer">
        <div class="title-container">
          <div class="title" ref="title">
            <h2 class="wiggle">Tap to get a prize!</h2>
          </div>
        </div>
        <div class="prize-container" ref="prizeContainer">
          <div class="prize-ball-container"></div>
          <div class="prize-reward-container" ref="prizeReward">
            <div class="shine">
              <img src="https://assets.codepen.io/2509128/shine.png" />
            </div>
            <div class="prize">
              <img class="wiggle" :src="prize.image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getPrize, createBalls, startAnimation, jitterAnimation, stopJitterAnimation, pickupAnimation, popAnimation } from './animations'

export default {
  data() {
    return {
      prize: null,
      balls: [],
      started: false,
      prizeBall: null,
      jitterTimelines: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.prize = await getPrize()
      this.balls = createBalls()
      this.setupAnimation()
    },
    setupAnimation() {
      const $app = this.$refs.app
      const $machine = this.$refs.machine
      const $handle = this.$refs.handle
      const $balls = this.$refs.balls
      const $title = this.$refs.title
      const $pointer = this.$refs.pointer

      this.startAnimation = startAnimation.bind(this, {
        $app,
        $machine,
        $handle,
        $balls,
        $title,
        $pointer,
        balls: this.balls,
        prize: this.prize,
        setPrizeBall: (ball) => {
          this.prizeBall = ball
        },
        jitterAnimation: this.jitterAnimation,
        stopJitterAnimation: this.stopJitterAnimation,
        pickupAnimation: this.pickupAnimation,
        popAnimation: this.popAnimation
      })
    },
    jitterAnimation(callback) {
      this.jitterTimelines = jitterAnimation(this.balls, this.$refs.machine)
      callback()
    },
    stopJitterAnimation() {
      stopJitterAnimation(this.balls, this.jitterTimelines)
    },
    pickupAnimation() {
      pickupAnimation(this.prizeBall, this.$refs.prizeContainer)
    },
    popAnimation() {
      popAnimation(this.$refs.app, this.$refs.prizeReward, this.$refs.title, this.$refs.machine)
    }
  }
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap');


* {
	&,
	&::before,
	&::after {
		box-sizing: border-box;
		font-family: inherit;
		padding: 0;
		margin: 0;
	}
}

html {
	font-size: 62.5%;
	height: 100%;
	color: white;
	font-family: 'M PLUS Rounded 1c', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

	body {
		font-size: 1.6rem;
		overflow: hidden;
		height: 100%;
		position: relative;
		user-select: none;
	}
}

.dim {
	&[data-animate] {
		filter: brightness(0.6) saturate(0.8);
	}
	
	transition: 0.5s linear;
}

.confetti {
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	z-index: 10;
	pointer-events: none;
	perspective: 100vmin;

	span {
		--size: 5;

		display: block;
		position: absolute;
		width: calc(var(--size) * 1px);
		height: calc(var(--size) * 1px);
		background-color: blue;
		animation: rotate linear calc(var(--rs) * 1s) infinite both;
	}
}

#app.gotcha {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: #666;

	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;

		.game-layer {
			width: 100%;
			height: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			background: url(https://assets.codepen.io/2509128/bg.jpg) center/auto 100% no-repeat;

			.machine-container {
				position: relative;
				white-space: nowrap;

				.machine {
					position: relative;
					z-index: 1;
					max-height: 500px;
					pointer-events: none;
					 max-width: 500px;
				}

				.backboard {
					z-index: 0;
					width: 15vh;
					height: 13vh;
					top: 65%;
					left: 48%;
					background-color: #e288bb;
					position: absolute;
				}

				.title {
					--stroke-color: #ad8bd6;
					position: absolute;
					display: block;
					top: 10%;
					width: 100%;
					text-align: center;
					//@extend %stroke;
					font-size: 5vh;
					z-index: 3;

					span {
						animation: blink 0.8s linear both infinite;

						@for $i from 1 through 10 {
							&:nth-child(#{$i}) {
								animation-delay: #{$i * 0.12}s;
							}
						}
					}
				}

				.price {
					z-index: 3;
					position: absolute;
					color: #fb91c9;
					font-size: 2.5vh;
					top: 80%;
					left: 15%;
				}

				.handle {
					z-index: 3;
					position: absolute;
					height: 3.9vh;
					left: 13%;
					top: 69%;
				}

				.balls {
					position: absolute;
					top: 22%;
					left: 2%;
					width: 96%;
					height: 34.5%;
				}

				.pointer {
					position: absolute;
					height: 15vh;
					top: 75%;
					left: 15%;
					z-index: 5;
          pointer-events: none;

					img {
						height: 100%;
						display: block;
						transform: rotate(-30deg);
						transform-origin: 0% 0%;
						animation: click 1s ease-in-out infinite both;
					}
				}
			}
		}

		.ui-layer {
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			pointer-events: none;

			.title-container {
				width: 100%;
				height: 100%;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;

				.title {
					h2 {
						--stroke-color: #f06e5b;
						text-align: center;
						@extend %stroke;
						font-size: 5vh;
					}
				}
			}

			.prize-container {
				width: 100%;
				height: 100%;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;

				.prize-ball-container {
					width: 100%;
					height: 100%;
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
				}

				.prize-reward-container {
					width: 100%;
					height: 100%;
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;

					&>* {
						display: block;
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.prize {
						img {
							height: 50vh;
						}
					}

					.shine {
						img {
							height: 100vh;
							animation: spin linear 5s infinite forwards;
						}
					}
				}
			}
		}

		.ball {
			--size: 8vh;
			--outline: #4c3fc2;
			--color1: #2facff;
			--color2: #ff8ff6;

			width: var(--size);
			height: var(--size);
			border-radius: 100%;
			background-color: var(--color1);
			border: solid 0.8vh var(--outline);
			position: absolute;
			overflow: hidden;

			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				height: 200%;
				width: 200%;
				background-color: var(--color2);
				border-radius: 100%;
				border: inherit;
				transform: translate(-25%, -5%);
			}
		}
	}

	.wiggle {
		animation: wiggle 2s ease-in-out infinite both;
	}
}

@keyframes blink {
	0% {
		color: #ffc7e5;
	}

	20% {
		color: #fcff33;
	}

	100% {
		color: #ffc7e5;
	}
}

@keyframes wiggle {
	0% {
		transform: rotate(-5deg);
	}

	50% {
		transform: rotate(5deg);
	}

	100% {
		transform: rotate(-5deg);
	}
}

@keyframes click {
	0% {
		transform: rotate(-30deg) translateY(0vh);
	}

	80% {
		transform: rotate(-30deg) translateY(5vh);
	}

	100% {
		transform: rotate(-30deg) translateY(0vh);
	}
}

@keyframes spin {
	to {
		transform: rotate(0turn);
	}

	from {
		transform: rotate(1turn);
	}
}


@keyframes rotate {
	from {
		transform: rotate3d(var(--rx), var(--ry), var(--rz), 0turn);
	}

	to {
		transform: rotate3d(var(--rx), var(--ry), var(--rz), 1turn);
	}
}
</style>