ui<template>
<div  :class="[visible ? 'movie visible' : 'hidden']" v-on:click="stop()">
  <canvas class="animation" height="300" ref="animation"/>
</div>
</template>

<script>
import Display from "../Display.js";
import Soldier from "../soldier.js";

// Used to define the last frame to stop the animation
let last;

export default {
  data: function() {
    return {
      visible: true
    }
  },
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
  created: function () {
    this.rules = this.$rules;
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
    var result;
    if (this.rules.getResult('success') > 0) {result = 1;} else {result = 2;}

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
        laserY: 210,
      },
      {
        soldier: computerSoldier,
        side: 2,
        posX: range*1.5,
        posY: 210,
        laserX: range*1.5-32,
        laserY: 210,
      },
      {
        soldier: playerSoldier,
        side: 1,
        posX: range*1.4,
        posY: 230,
        laserX: range*1.4-32,
        laserY: 230,
      },
    ];
    let start;
    let played;
    let currentStep=1;

    function step(timestamp) {
      if (start == null) {
        start = timestamp;
      }
      let frame;
      const elapsed = timestamp - start;
      
      if (currentStep != 2) {
        frame = Math.floor(elapsed/150%4)+1;
        } else {
        frame = Math.floor((elapsed-1000)/100)+1;
      }

      if (elapsed > 1000 && currentStep == 1 && frame == 2) {
        currentStep = 2;
        console.info("switch to step: "+currentStep);
      } else if (currentStep == 3 && soldiers[0].posX <= width - soldiers[0].laserX - soldiers[0].soldier._shootX) {
        currentStep = 4;
        ref.play('hit2');
        console.info("switch to step: "+currentStep);
      } else if (elapsed > 6000) {
        cancelAnimationFrame(last);
        ref.visible = false;
        console.log('ok');
        return true;
      }

      draw(elapsed, currentStep, frame);
      if (frame == 6 && !played) {
        played = ref.play('blaster1');
      } else if (frame == 10 && played) {
        currentStep = 3;
        console.info("switch to step: "+currentStep);
      }
      last = requestAnimationFrame(step);
    }


    function draw(elapsed, step, frame) {
      ctx.drawImage(background, 0, 0, width, 300);
      
      let lastSide = null;
      let speed= 8;
      for (const index in soldiers) {
        const current = soldiers[index];
        const soldier = current.soldier;
        if (lastSide != current.side) {
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
        }
        switch (step) {
          case 2:
            ctx.drawImage(soldier._start[Math.min(4, frame)], current.posX, current.posY);
            if (frame > 6 && elapsed > 1500) {
              current.laserX = fire(soldier._laser, current.laserX, current.laserY+soldier._shootY, speed);
            }
            break;
          case 3:
            current.laserX = fire(soldier._laser, current.laserX, current.laserY+soldier._shootY, speed);
            ctx.drawImage(soldier._idle[frame], current.posX, current.posY);
            break;
          case 4:
            if (result == current.side) {
              ctx.drawImage(soldier._idle[frame], current.posX, current.posY);
            } else {
              speed = kill(soldier._idle[1], current.posX, current.posY, speed);
              current.posX += speed;
              // current.posY -= speed/speed*15;
            }
            current.laserX = fire(soldier._laser, current.laserX, current.laserY+soldier._shootY, speed);
            break;
          default:
            ctx.drawImage(soldier._idle[frame], current.posX, current.posY);
            break;
        }
        lastSide = current.side;
      }
      // The canvas is flipped to draw the soldier at the right position, so it need to end on the right side
      if (lastSide == 1) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
    }

    // move the laser, and define its speed
    function fire(laser, x, y, speed=0) {
      ctx.drawImage(laser, x, y);
      return x - speed;
    }

    function kill(soldier, x, y, speed=0) {
      ctx.drawImage(soldier, x, y);
      return speed;
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
.hidden {
  visibility: hidden;
}

.movie {
  background: black;
  display: flex;
  height: 100%;
  position: absolute;
  align-items: center;
}

.animation {
  height: 300px;
}
</style>