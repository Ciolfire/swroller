ui<template>
<div>
  <canvas height="300" ref="animation"/>
</div>
</template>

<script>
export default {
	mounted() {
    const ctx = this.$refs.animation.getContext("2d");

    const width = window.innerWidth;
    const background = new Image();
    const goodSoldier = new Image();
    const badSoldier = new Image();

    const range = width/2;
    const laser = [range+31, 247, 30, 3];
    const laser2 = [range+100, 237, 30, 3];
    this.$refs.animation.width = width;
    function init() {
      background.src = require("../assets/img/background/endor.jpg");
      goodSoldier.src = require("../assets/img/rebeltrooper.png");
      badSoldier.src = require("../assets/img/stormtrooper.png");
      goodSoldier.setAttribute('transform', 'scale(-1, 1) translate(-100, 0)')
      window.requestAnimationFrame(draw);

    }

    // let time = 0;

    function draw() {
      // const rgb = "rgb(255,0,0)";
			// ctx.fillStyle = rgb;
      // ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(background, 0, 0, 600, 300);
      ctx.translate(450, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(goodSoldier, range+100, 205);
      ctx.drawImage(goodSoldier, range+50, 210);
      // ctx.drawImage(goodSoldier, 80 , 215);
      ctx.translate(450, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(badSoldier, range+100, 205);
      ctx.drawImage(badSoldier, range+50, 210);
      // ctx.drawImage(badSoldier, 320, 225);
      // ctx.drawImage(badSoldier, 270, 205);
      // ctx.drawImage(badSoldier, 280, 215);
      // ctx.drawImage(badSoldier, 290, 225);
      
      // console.log("test");
      // if (time >= 100) {
      //   return;
      // } else {
      //   time++;
      // }
      if (laser[0] > range-100) {
        fire(laser);
      }
        fire(laser2);

      window.requestAnimationFrame(draw);
    }

    function fire(laser, speed=2, direction=-1) {
      laser[0] += speed*direction;
      ctx.fillStyle= "#FF0000";
      ctx.fillRect(laser[0], laser[1], laser[2], laser[3]);
    }

    init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>