ui<template>
<div>
  <canvas height="300" ref="animation"/>
</div>
</template>

<script>
import Display from "../Display.js";
import Soldier from "../soldier.js";

export default {
  mounted() {
    const playerSoldier = new Soldier(ressource("soldier", "endorTrooper"));
    const computerSoldier = new Soldier (ressource("soldier", "stormTrooper"));
    const ctx = this.$refs.animation.getContext("2d");

    const width = window.innerWidth;
    const background = new Image();
    
    this.$refs.animation.width = width;
    const range = width/2;

    let start;
    let last;
    let goodSoldiers;
    let badSoldiers;

    function init(timestamp) {
      start = timestamp;
      background.src = require("../assets/img/background/endor.jpg");
      prepareSoldier(playerSoldier);
      prepareSoldier(computerSoldier);
      goodSoldiers = [
        {
          soldier: playerSoldier,
          posX: range+50,
          posY: 210
        }
      ];

      badSoldiers = [
        {
          soldier: computerSoldier,
          posX: range+50,
          posY: 210
        }
      ];

      last = requestAnimationFrame(step);
    }

    function step(timestamp) {
      const elapsed = timestamp - start;
      if(elapsed < 10000) {
        console.log(elapsed);
        draw(elapsed);
        last = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(last)
      }
		}

    function prepareSoldier(soldier) {
      for (const index in soldier._idle) {
        let tmp = new Image();
        tmp.src = require("../"+soldier._idle[index]);
        soldier._idle[index] = tmp;
      }
      for (const index in soldier._start) {
        let tmp = new Image();
        tmp.src = require("../"+soldier._start[index]);
        soldier._start[index] = tmp;
      }
      let laser = new Image();
      laser.src = require("../"+soldier._laser);
      soldier._laser = laser;
    }

    function ressource(category, type) {
      return Display[category].find(obj => obj.type == type);
    }

    function draw(elapsed) {
      console.log("elapsed: "+elapsed);
      ctx.drawImage(background, 0, 0, 600, 300);

      ctx.translate(450, 0);
      ctx.scale(-1, 1);
      for (const index in goodSoldiers) {
        const current = goodSoldiers[index];
        const soldier = current.soldier;
        ctx.drawImage(soldier._start[4], current.posX, current.posY);
        ctx.drawImage(soldier._laser, current.posX-soldier._shootX, current.posY+soldier._shootY);
      }
      ctx.translate(450, 0);
      ctx.scale(-1, 1);
      for (const index in badSoldiers) {
        const current = badSoldiers[index];
        const soldier = current.soldier;
        ctx.drawImage(soldier._start[4], current.posX, current.posY);
        ctx.drawImage(soldier._laser, current.posX-soldier._shootX, current.posY+soldier._shootY);
      }
      // fire(laser3);
      // ctx.drawImage(playerSoldier._idle[test], range+100, 205);
      // ctx.drawImage(playerSoldier._start[test], range+100, 205);
      // fire(laser4);
      // ctx.drawImage(goodSoldier, range+50, 210);
      // fire(laser, false);
      // ctx.drawImage(badSoldier, range+100, 205);
      // fire(laser2, false);
      // ctx.drawImage(badSoldier, range+50, 210);
    }

    // function fire(laser, isGood=true, speed=10) {
    //   laser[0] -= speed;
    //   if (isGood == true) {
    //     ctx.drawImage(goodLaser, laser[0], laser[1]);
    //     } else {
    //     ctx.drawImage(badLaser, laser[0], laser[1]);
    //   }
    // }
    last = requestAnimationFrame(init);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>