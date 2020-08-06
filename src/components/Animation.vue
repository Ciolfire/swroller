ui<template>
<div v-on:click="stop()">
  <canvas height="300" ref="animation"/>
</div>
</template>

<script>
import Display from "../Display.js";
import Soldier from "../soldier.js";
  let last;

export default {
  methods: {
    stop: function () {
      this.$root.play('dicer-click');
      cancelAnimationFrame(last);
    },
    play: function (sound) {
      this.$root.play(sound);
      return true;
    }
  },
  mounted() {
    const playerSoldier = new Soldier(ressource("soldier", "endorTrooper"));
    const computerSoldier = new Soldier (ressource("soldier", "stormTrooper"));
    const ctx = this.$refs.animation.getContext("2d");

    const width = window.innerWidth;
    const background = new Image();
    
    this.$refs.animation.width = width;
    const range = width/2;
    const ref = this;

    background.src = require("../assets/img/background/endor.jpg");
    prepareSoldier(playerSoldier);
    prepareSoldier(computerSoldier);
    let soldiers = [
      {
        soldier: playerSoldier,
        side: 1,
        posX: range*1.5,
        posY: 210,
        laserX: range*1.5-32,
      },
      {
        soldier: computerSoldier,
        side: 2,
        posX: range*1.5,
        posY: 210,
        laserX: range*1.5-32,
      },
      {
        soldier: playerSoldier,
        side: 1,
        posX: range*1.4,
        posY: 230,
        laserX: range*1.4-32,
      },
    ];
    let start;
    let played;

    function step(timestamp) {
      if (start == null) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      let frame = Math.floor(elapsed/150%4)+1;

      if(elapsed < 1000) {
        draw(elapsed, 1, frame);
        last = requestAnimationFrame(step);
      } else if (elapsed < 2000) {
        frame = Math.floor((elapsed-1000)/100)+1;
        draw(elapsed, 2, frame);
        last = requestAnimationFrame(step);
        if (frame == 6 && !played) {
          played = ref.play('blaster1');
        }
      } else if (elapsed < 6000) {
        draw(elapsed, 3, frame);
        last = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(last)
      }
    }


    function draw(elapsed, step, frame) {
      ctx.drawImage(background, 0, 0, width, 300);
      
      let lastSide = null;
      for (const index in soldiers) {
        const current = soldiers[index];
        const soldier = current.soldier;
        if (lastSide != current.side) {
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
        }
        if (step == 2) {
          ctx.drawImage(soldier._start[Math.min(4, frame)], current.posX, current.posY);
          if (frame > 6 && elapsed > 1500) {
            current.laserX = fire(soldier._laser, current.laserX, current.posY+soldier._shootY);
          }
        } else {
          ctx.drawImage(soldier._idle[frame], current.posX, current.posY);
        }
        if (step == 3) {
          current.laserX = fire(soldier._laser, current.laserX, current.posY+soldier._shootY);
        }
        lastSide = current.side;
      }
      if (lastSide == 1) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
    }

    function fire(laser, x, y) {
      const speed = 5;
      ctx.drawImage(laser, x, y);
      return x - speed;
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
    
    // When the background is read, we start the animation
    background.onload = function() {
      (last = requestAnimationFrame(step));
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>