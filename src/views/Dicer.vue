<template>
  <div id="ui">
    <div @click="resetPool()" class="btn btn-lg reset" v-on:click="play('delete2')">Reset</div>
    <!-- Ability -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(70,111,36);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.ability.length }}</div>
      <div @click="addToPool('ability')" class="col" v-bind:class="[(this.rules._pool.ability.length>=this.rules._limit.ability) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('ability')" class="col" v-bind:class="[this.rules._pool.ability.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- Proficiency -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,246,46);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.proficiency.length }}</div>
      <div @click="addToPool('proficiency')" class="col" v-bind:class="[(this.rules._pool.proficiency.length>=this.rules._limit.proficiency) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('proficiency')" class="col" v-bind:class="[this.rules._pool.proficiency.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- difficulty -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(56,0,65);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.difficulty.length }}</div>
      <div @click="addToPool('difficulty')" class="col" v-bind:class="[(this.rules._pool.difficulty.length>=this.rules._limit.difficulty) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('difficulty')" class="col" v-bind:class="[this.rules._pool.difficulty.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- challenge -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(203,0,8);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.challenge.length }}</div>
      <div @click="addToPool('challenge')" class="col" v-bind:class="[(this.rules._pool.challenge.length>=this.rules._limit.challenge) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('challenge')" class="col" v-bind:class="[this.rules._pool.challenge.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- boost -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="25,25 75,25 75,75 25,75" style="fill:rgb(207,237,255);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.boost.length }}</div>
      <div @click="addToPool('boost')" class="col" v-bind:class="[(this.rules._pool.boost.length>=this.rules._limit.boost) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('boost')" class="col" v-bind:class="[this.rules._pool.boost.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- setback -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="25,25 75,25 75,75 25,75" style="fill:rgb(2,0,11);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.setback.length }}</div>
      <div @click="addToPool('setback')" class="col" v-bind:class="[(this.rules._pool.setback.length>=this.rules._limit.setback) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('setback')" class="col" v-bind:class="[this.rules._pool.setback.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <!-- Force -->
    <div class="row">
      <svg class="col" height="50" viewBox="0 0 100 100">
        <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,255,255);" />
      </svg>
      <div class="col dice-number">{{ this.rules._pool.force.length }}</div>
      <div @click="addToPool('force')" class="col" v-bind:class="[(this.rules._pool.force.length>=this.rules._limit.force) ? 'btn-off' : 'add btn']">+</div>
      <div @click="removeFromPool('force')" class="col" v-bind:class="[this.rules._pool.force.length ? 'remove btn' : 'btn-off']">-</div>
    </div>
    <router-link to="/result" class="btn btn-lg" v-on:click.native="play('dicer-back')">Roll</router-link>
  </div>
</template>

<script>
export default {
  created: function () {
    this.rules = this.$rules;
  },
  data: function() {
    return {
      rules: this.rules
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
  font-size: xxx-large;
}

.reset {
  color: #4273ae;
}

.remove {
  color: darkred;
  font-size: xxx-large;
}

.dice-number {
  color: #4273ae;
  font-size: xx-large;
  text-align: center;
  font-family: "starFont";
}

polygon {
  stroke: rgb(255, 255, 255);
  stroke-opacity: 0.3;
  stroke-width: 2;
  filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
}
</style>
