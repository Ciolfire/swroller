<template>
<canvas ref="background"/>
</template>

<script>
export default {
	mounted() {
		const background = this.$refs.background;
		const c = background.getContext("2d");

		let width;
		let height;

		function setCanvasExtents () {
			background.style.width = "100%";
			background.style.height = "100vh";

			width = background.offsetWidth;
			height = background.offsetHeight;

			background.width = width;
			background.height = height;
		}
		
		setCanvasExtents();

    window.onresize = () => {
      // setCanvasExtents();
    };

		function makeStars(count) {
			const out = [];
			for (let i = 0; i < count; i++) {
				const s = {
					y: Math.random() * 1600 - 800,
					x: Math.random() * 900 - 450,
					z: Math.random() * 1000,
				};
				out.push(s);
			}
			return out;
		}

		// Number of stars
		let stars = makeStars(5000);

		function clear() {
			c.fillStyle = "black";
			c.fillRect(0, 0, background.width, background.height);
		}

		function putPixel(x, y, brightness) {
			const intensity = brightness * 255;
			const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
			c.fillStyle = rgb;
			c.fillRect(x, y, 1, 1);
		}

		function moveStars(distance) {
			const count = stars.length;
			for (var i = 0; i < count; i++) {
				const s = stars[i];
				s.z -= distance;
				while (s.z <= 1) {
					s.z += 1000;
				}
			}
		}

		let prevTime;

		function init(time) {
			prevTime = time;
			requestAnimationFrame(tick);
		}

		function tick(time) {
			let elapsed = time - prevTime;
			prevTime = time;

			moveStars(elapsed * 0.01);

			clear();

			const cx = width / 2;
			const cy = height / 2;

			const count = stars.length;
			for (var i = 0; i < count; i++) {
				const star = stars[i];

				const x = cx + star.x / (star.z * 0.001);
				const y = cy + star.y / (star.z * 0.001);

				if (x < 0 || x >= width || y < 0 || y >= height) {
					continue;
				}

				const d = star.z / 1000.0;
				const b = 1 - d * d;

				putPixel(x, y, b);
			}

			requestAnimationFrame(tick);
		}
		requestAnimationFrame(init);
	},
	methods: {},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
