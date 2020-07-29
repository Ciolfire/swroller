<template>
  <div id="ui">
    <div @click="play('delete2')" class="btn btn-lg reset" v-on:click="resetPool()">Reset</div>
    <div class="f-row dice-row" v-for="(item, index) in display.dice" :key="index">
      <svg class="f-col-0" width="50" height="50" viewBox="0 0 100 100">
        <polygon :class="'dice ' + item.type" :points="ressource('dice', item.type)"/>
      </svg>
      <div class="f-col-0 dice-number">{{ rules.getPoolSize(item.type) }}</div>
      <div @click="addToPool(item.type)" :class="[(rules.getPoolSize(item.type)>=rules.getLimit(item.type)) ? 'f-col btn-off' : 'f-col add btn']">+</div>
      <div @click="removeFromPool(item.type)" :class="[rules.getPoolSize(item.type) ? 'f-col remove btn' : 'f-col btn-off']">-</div>
    </div>
    <div class="f-row f-bottom f-grow">
      <router-link :event="isPoolReady? 'click' : ''" to="/result" :class="[isPoolReady ? 'btn btn-lg f-grow' : 'btn-lg btn-off f-grow']" v-on:click.native="play('dicer-back')">Roll</router-link>
    </div>
  </div>
</template>

<script>
import Display from "./../Display.js";

export default {
  created: function () {
    this.rules = this.$rules;
    this.isPoolReady = this.rules.getPoolSize();
  },
  data: function() {
    return {
      rules: this.rules,
      display: Display,
      isPoolReady: this.isPoolReady
    }
  },
  methods: {
    play: function (sound) {
      if (this.isPoolReady) {
        this.$root.play(sound);
      }
    },
    addToPool: function (type, quantity=1) {
      console.log("click");
      this.rules.addToPool(type, quantity);
      this.isPoolReady = true;
    },
    removeFromPool: function (type, quantity=1) {
      this.rules.removeFromPool(type, quantity);
      this.isPoolReady = this.rules.getPoolSize();
    },
    resetPool: function () {
      this.rules.resetPool();
      this.isPoolReady = false;
    },
    getPoolSize(type) {
      return this.rules.getPoolSize(type);
    },
    getLimit(type) {
      return this.rules.getLimit(type);
    },
    ressource: function (category, type) {
			return Display[category].find(obj => obj.type == type)['src'];
		}
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dice-row {
  width: 90%;
}

.f-col {
  align-self: center;
}

.f-row {
  margin: auto;
}

.f-bottom {
  width: 80%;
}

.dice-number {
  color: #4273ae;
  font-size: x-large;
  line-height: 50px;
  text-align: center;
  font-family: "starFont";
  width: 100px;
}

.dice {
  stroke: white;
  stroke-opacity: 0.4;
  stroke-width: 2;
  filter: drop-shadow(rgba(255, 255, 255, 1) 0px 0px 10px);
}

.reset {
  color: #4273ae;
}

.add {
  color: #4273ae;
}

.remove {
  color: darkred;
}

.ability {
	fill:rgb(70,111,36);
}

.proficiency {
	fill:rgb(255,246,46);
}

.difficulty {
	fill:rgb(56,0,65);
}

.challenge {
	fill:rgb(203,0,8);
}

.boost {
	fill:rgb(207,237,255);
}

.setback {
	fill:rgb(2,0,11);
}

.force {
	fill:rgb(255,255,255);
}
</style>
