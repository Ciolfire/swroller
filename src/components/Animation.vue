ui<template>
<div  :class="[visible ? 'movie visible' : 'hidden']" v-on:click="stop()">
  <div class="col">
    <canvas class="animation" height="300" ref="animation"/>
    <p class="text"><img height="20" src="./../assets/img/tap.svg"> Skip!</p>
  </div>
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
      this.visible = false;
    },
    play: function (sound) {
      this.$root.play(sound);
      console.log(sound);
      return true;
    }
  },
  created: function () {
    this.rules = this.$rules;
  },
  mounted() {
    const ctx = this.$refs.animation.getContext("2d");
    const background = new Image();
    const width = window.innerWidth;
    this.$refs.animation.width = width;
    const range = width/2;
    const ref = this;

    const playerSoldier = new Soldier(ressource("soldier", "endorTrooper"));
    const playerOfficier = new Soldier(ressource("soldier", "hanSolo"));
    const computerSoldier = new Soldier (ressource("soldier", "stormTrooper"));
    const computerOfficier = new Soldier (ressource("soldier", "stormOfficier"));
    
    let kills = this.rules.killSoldiers();

    let soldiers = [];
    let index = 0;
    let start=null;
    let ending;
    let currentStep;
    let played = false;
    const positions = [
      [1.3,205, false],
      [1.5,210, false],
      [1.4,235, false],
      [1.6,240, false],
      [1.15,225, true], //leader
    ];

    background.src = require("../assets/img/background/endor.jpg");
    prepareSoldier(playerSoldier);
    prepareSoldier(playerOfficier);
    prepareSoldier(computerSoldier);
    prepareSoldier(computerOfficier);
    for (let index = 0; index < positions.length; index++) {
      const coord = positions[index];
      recruitSoldier(coord[0], coord[1], 1, coord[2]);
      recruitSoldier(coord[0], coord[1], 2, coord[2]);
    }
    
    // Choose the kind of soldier to recruit
    function recruitSoldier(ratioX, posY, side, isLeader) {
      let soldier;

      if (side == 1) {
        soldier = playerSoldier;
        if (isLeader) {
          soldier = playerOfficier;
        }
      } else {
        soldier = computerSoldier;
        if (isLeader) {
          soldier = computerOfficier;
        }
      }
      soldiers[index] = {soldier: soldier, side: side, posX: range*ratioX, posY: posY, laserX: range*ratioX-playerSoldier._shootX, laserY: posY};
      index++;
    }

    // Take care of calling the draw function, and to switch the step
    function step(timestamp) {
      if (start == null) {
        start = timestamp;
        currentStep = 1;
      }
      const elapsed = timestamp - start;
        if (ending == null && currentStep == 4) {
          ending = elapsed;
        }

      let frame;
      if (currentStep == 2) {
        frame = Math.floor((elapsed-1000)/100)+1;
        } else {
          frame = Math.floor(elapsed/150%4)+1;
      }

      if (currentStep == 1 && elapsed > 1000 && frame == 2) {
        currentStep = 2;
        console.info("switch to step "+currentStep);
      } else if (currentStep == 3 && soldiers[5].posX <= width - soldiers[5].laserX - soldiers[5].soldier._shootX) {
        currentStep = 4;
        ref.play('hit1');
        ref.play('hit2');
        console.info("switch to step "+currentStep);
      } else if (currentStep == 4 && elapsed > ending+1500) {
        cancelAnimationFrame(last);
        ref.visible = false;
        return true;
      }

      draw(elapsed, currentStep, frame);
      if (currentStep == 2 && frame == 6 && !played) {
        played = ref.play('blaster1');
        ref.play('blaster2');
        // ref.play('blaster1');
      } else if (currentStep == 2 && frame == 10) {
        currentStep = 3;
        console.info("switch to step "+currentStep);
      }
      last = requestAnimationFrame(step);
    }

    // Draw the animation, depending on the step
    function draw(elapsed, step, frame) {
      ctx.drawImage(background, 0, 0, width, 300);
      
      let lastSide = null;
      let speed= 12;
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
            if (!kills.includes(index)) {
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
  visibility: collapse;
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

.text {
  margin: 0;
  font-family: starFont;
  filter: drop-shadow(rgba(255, 255, 255, 1) 0px 0px 10px);
  color: white;
  text-align: right;
  line-height: 20px;
  font-size: 20px;
  padding-top: 20px;
  padding-right: 20px;
}

.icon {
  fill: white;
}
</style>