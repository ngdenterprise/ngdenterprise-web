<template>
  <div class="drops" ref="container">
    
  </div>
</template>

<script>
import { ref } from 'vue'
import Matter from 'matter-js'
import _ from 'lodash'

export default {
	name: 'Drops',
	setup() {
		const render = ref(null)
		const engine = ref(null)
		
		return {
			render,
			engine
		}
	},
	mounted() {
		window.addEventListener('resize', _.debounce(this.renderWorld, 100))
		this.renderWorld()
	},
	methods: {
		renderWorld() {
			const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Common, Vertices } = Matter
			window.decomp = require('poly-decomp')
			
			if (this.render && this.engine) {
				World.clear(this.engine && this.engine.world);
				Engine.clear(this.engine);
				Render.stop(this.render);
				this.render.canvas.remove();
				this.render.canvas = null;
				this.render.context = null;
				this.render.textures = {};
			}

			const height = _.get(this.$refs, 'container.clientHeight')
			const width = _.get(this.$refs, 'container.clientWidth')
			if (!height || !width) return

			const engine = Engine.create()
			const render = Render.create({
				element: this.$refs.container,
				engine: engine,
				options: {
					height,
					width,
					wireframes: false,
					background: 'transparent'
				}
			})

			const len = this.$mq === 'mobile' ? 60 : 150;
			const lenToRadius = (length, sides) => {
				if (!sides || sides < 3) return length / 2
				if (sides === 3) {
					return len * Math.sqrt(3) / sides
				}
				return length / (2 * Math.sin(180 / sides))
			}
			const degreeToRadian = (degree) => degree * Math.PI / 180 
			
			const randomX = (margin = 20, percent = 0.2) => {
				const isLeft = Math.random() < 0.5
				return isLeft ? Math.random() * (width * percent + margin) :
					Math.random() * (width * percent) + (width * (1 - percent)) - margin
			}
			const randomY = (dither = 20) => height / 2 + Math.random() * (dither * 2) - dither

			const commonOptions = {
				friction: 0.0001,
				friction: 0.01
			};

			const generateSemiCirclePath = (radius) => {
				const path = [radius * 2, 0]
				for (let i = 0; i < 180; i++) {
					let x = -1
					let y = -1
					if (i < 90) {
						x = (1 - Math.cos(degreeToRadian(i))) * radius
						y = Math.sin(degreeToRadian(i)) * radius
					} else if (i === 90) {
						x = radius
						y = radius
					} else {
						x = (1 + Math.cos(degreeToRadian(180 - i))) * radius
						y = Math.sin(degreeToRadian(180 - i)) * radius
					}
					path.push(x)
					path.push(y)
				}
				return path.join(' ')
			}
			const semiCircleVertices = Vertices.fromPath(generateSemiCirclePath(lenToRadius(len)))
			const semiCircleColor = Common.choose(['#00AF92'])
			const semiCircle = Bodies.fromVertices(randomX(), randomY(), Common.choose([semiCircleVertices]), {
				...commonOptions,
				render: {
					fillStyle: semiCircleColor,
					strokeStyle: semiCircleColor,
					lineWidth: 1
				}
			}, true);

			const generateDiamondPath = (length) => {
				const adjustedLength = length / 3 * 2
				const halfLength = adjustedLength / 2
				const halfHeight = Math.round(halfLength * Math.sqrt(3))
				return `${halfLength} 0 ${adjustedLength} ${halfHeight} ${halfLength} ${halfHeight * 2} 0 ${halfHeight}`
			}
			const diamondVertices = Vertices.fromPath(generateDiamondPath(len))
			const diamondColor = Common.choose(['#917CDC'])
			const diamond = Bodies.fromVertices(randomX(), randomY(), Common.choose([diamondVertices]), {
				...commonOptions,
				render: {
					fillStyle: diamondColor,
					strokeStyle: diamondColor,
					lineWidth: 1
				}
			}, true);

			const triangle = Bodies.polygon(randomX(), randomY(), 3, lenToRadius(len, 3), { ...commonOptions, render: { fillStyle: '#DEFC78' } });
			const square = Bodies.rectangle(randomX(), randomY(), len, len, { ...commonOptions, render: { fillStyle: '#EF816A' } });
			const rectangle = Bodies.rectangle(randomX(), randomY(), len, len / 4, { ...commonOptions, render: { fillStyle: '#25AEE4' } });
			const pentagon =  Bodies.polygon(randomX(), randomY(), 5, lenToRadius(len, 5), { ...commonOptions, render: { fillStyle: '#F9FAFA' } });
			const circle = Bodies.circle(randomX(), randomY(), len / 2, { ...commonOptions, render: { fillStyle: '#00E599' } });

			const wallThickness = 10;
			const floorThickness = 20;
			const boundaryColor = 'transparent'

			const leftWall = Bodies.rectangle(0 + wallThickness, height, wallThickness, height * 2, { 
				isStatic: true, 
				render: {
					fillStyle: boundaryColor,
				}
			})

			const rightWall = Bodies.rectangle(width - wallThickness, height, wallThickness, height * 2, { 
				isStatic: true, 
				render: {
					fillStyle: boundaryColor,
				}
			})

			const celling = Bodies.rectangle(width / 2, 0, width, floorThickness, {
				isStatic: true, 
				render: {
					fillStyle: boundaryColor,
				}
			})

			const floor = Bodies.rectangle(width / 2, height - floorThickness, width, floorThickness, {
				isStatic: true, 
				render: {
					fillStyle: boundaryColor,
				}
			})

			World.add(engine.world, [
				semiCircle, 
				triangle, 
				square, 
				rectangle, 
				pentagon, 
				diamond, 
				circle,
				celling,
				leftWall,
				rightWall, 
				floor
			])

			const mouse = Mouse.create(render.canvas)
			const	mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.01,
					render: {
						visible: false
					}
				}
			});
			mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
			mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

			render.mouse = mouse
			World.add(engine.world, mouseConstraint)
			Engine.run(engine)
			Render.run(render)

			this.engine = engine
			this.render = render
		},
	},
	unmounted() {
		window.removeEventListener('resize', this.renderWorld)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drops {
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
}
</style>
