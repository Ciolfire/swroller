ui<template>
<div>
  <canvas height="300" ref="animation"/>
</div>
</template>

<script>
import Display from "../Display.js";
export default {
  mounted() {
    const playerSoldier = ressource("soldier", "endorRebel");
    const computerSoldier =  ressource("soldier", "stormtrooper");
    const ctx = this.$refs.animation.getContext("2d");

    const width = window.innerWidth;
    const background = new Image();
    const goodSoldier = new Image();
    const badSoldier = new Image();
    
    const goodLaser = new Image();
    const badLaser = new Image();

    const range = width/2;
    const laser = [range+28, 246];
    const laser2 = [range+78, 240];

    const laser3 = [range+18, 237, 30, 3];
    const laser4 = [range+68, 232, 30, 3];

    this.$refs.animation.width = width;
    function init() {
      console.log(playerSoldier['src']);
      console.log(computerSoldier['laser']);
      background.src = require("../assets/img/background/endor.jpg");
      goodSoldier.src = require("../"+playerSoldier['src']);
      goodLaser.src = require("../"+playerSoldier['laser']);
      badSoldier.src = require("../"+computerSoldier['src']);
      badLaser.src = require("../"+computerSoldier['laser']);
      window.requestAnimationFrame(draw);

    }

    // let time = 0;
    function ressource(category, type) {
      return Display[category].find(obj => obj.type == type);
    }

    function draw() {
      
      ctx.drawImage(background, 0, 0, 600, 300);

      ctx.translate(450, 0);
      ctx.scale(-1, 1);
      fire(laser3);
      ctx.drawImage(goodSoldier, range+100, 205);
      fire(laser4);
      ctx.drawImage(goodSoldier, range+50, 210);
      ctx.translate(450, 0);
      ctx.scale(-1, 1);
        fire(laser, false);
      ctx.drawImage(badSoldier, range+100, 205);
        fire(laser2, false);
      ctx.drawImage(badSoldier, range+50, 210);

      window.requestAnimationFrame(draw);
    }

    function fire(laser, isGood=true, speed=2) {
      laser[0] -= speed;
      if (isGood == true) {
        ctx.drawImage(goodLaser, laser[0], laser[1]);
        } else {
        ctx.drawImage(badLaser, laser[0], laser[1]);
      }
    }

    init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>