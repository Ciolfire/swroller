<template>
  <div id="ui">
    <div class="row" v-for="item in display.dice" :key="item">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon :class="'dice ' + item.type" :points="ressource('dice', item.type)"/>
      </svg>
      <div class="col dice-number">{{ rules.getPoolSize(item.type) }}</div>
      <div @click="addToPool(item.type)" :class="[(rules.getPoolSize(item.type)>=rules.getLimit(item.type)) ? 'col btn-off' : 'col add btn']">+</div>
      <div @click="removeFromPool(item.type)" :class="[rules.getPoolSize(item.type) ? 'col remove btn' : 'col btn-off']">-</div>
    </div>
    <router-link to="/result" class="btn btn-lg" v-on:click.native="play('dicer-back')">Roll</router-link>
  </div>
</template>

<script>
import Display from "./../Display.js";

export default {
  created: function () {
    this.rules = this.$rules;
  },
  data: function() {
    return {
      rules: this.rules,
      display: Display
    }
  },
  methods: {
    play: function (sound) {
      this.$root.play(sound);
    },
    addToPool: function (type, quantity=1) {
      this.rules.addToPool(type, quantity);
    },
    removeFromPool: function (type, quantity=1) {
      this.rules.removeFromPool(type, quantity);
    },
    resetPool: function () {
      this.rules.resetPool();
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
.row {
  width: 90%;
  display: flex;
  margin: auto;
  margin-top: 10px;
  justify-content: flex-start;
}

.col {
  margin: auto;
  width: 100px;
}

.add {
  color: #4273ae;
  font-size: xx-large;
}

.reset {
  color: #4273ae;
}

.remove {
  color: darkred;
  font-size: xx-large;
}

.dice-number {
  color: #4273ae;
  font-size: xx-large;
  text-align: center;
  font-family: "starFont";
}

.dice {
  stroke: rgb(255, 255, 255);
  stroke-opacity: 1;
  stroke-width: 2;
  filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
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
