<template>
  <div id="ui">
  <div class="container">
    <div class="row">
        <div class="col dice-number">9</div>
        <svg class="col" height="50" viewBox="0 0 100 100">
          <polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(70,111,36);" />
        </svg>
        <div class="col add">+</div>
        <div class="col remove"><span>-</span></div>
    </div>
    <div class="row">
        <div class="col remove"><span>-</span></div>
        <div class="col add">+</div>
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,246,46);" />
          </svg>
        <div class="col dice-number">9</div>
    </div>
  </div>
  <div class="container">
      <div class="row">
        <svg class="col" height="50" viewBox="0 0 100 100">
          <polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(70,111,36);" />
        </svg>
        <div class="col remove"><span>-</span></div>
        <div class="col dice-number">9</div>
        <div class="col add">+</div>
    </div>
    <div class="row">
        <div class="col remove"><span>-</span></div>
        <div class="col dice-number">9</div>
        <div class="col add">+</div>
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,246,46);" />
          </svg>
    </div>
  </div>

    <div class="container">
      <div class="row">
        <div class="col remove"><span>-</span></div>
        <div class="col dice-number">9</div>
        <svg class="col" height="50" viewBox="0 0 100 100">
          <polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(70,111,36);" />
        </svg>
    </div>
    <div class="row">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,246,46);" />
          </svg>
        <div class="col dice-number">9</div>
        <div class="col remove"><span>-</span></div>
    </div>
  </div>
    <!-- 
<td style="height:50px;">9</td>
<td rowspan="2">
<svg width="100" height="100">
<polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(70,111,36);" />
</svg>
</td>
<td rowspan="2">
<svg width="100" height="100">
<polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,246,46);" />
</svg>
</td>
<td style="height:50px;">9</td>
    -->
    <!-- 
<svg width="100" height="100">
<polygon points="25,25 75,25 75,75 25,75" style="fill:rgb(207,237,255);" />
</svg>
<svg width="100" height="100">
<polygon points="25,25 75,25 75,75 25,75" style="fill:rgb(2,0,11);" />
</svg> 
    -->
    <!--
<svg width="100" height="100">
<polygon points="50,15 75,50 50,85 25,50" style="fill:rgb(56,0,65);" />
</svg>
<svg width="100" height="100">
<polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(203,0,8);" />
</svg>
<svg width="100" height="100">
<polygon points="40,25 70,25 85,51 70,77 40,77 25,51" style="fill:rgb(255,255,255);" />
    </svg>-->
    <!-- <router-link to="/" class="btn" v-on:click.native="play('dicer-back')">Back</router-link> -->
    <router-link to="/" class="btn" v-on:click.native="play('dicer-back')">Roll</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    play: function (sound) {
      this.$root.play(sound);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: flex-start
}

.row {
  width: 50%;
  display: flex;
  justify-content: flex-start
}

.col {
  margin: auto;
  width: 100px;
}

.add {
  color: green;
  font-size: xxx-large;
  text-align: center;
  cursor: pointer;
}

.remove {
  color: darkred;
  font-size: xxx-large;
  text-align: center;
  cursor: pointer;
}

.dice-number {
  color: #4273ae;
  font-size: xxx-large;
  text-align: center;
}

.dice-block {
  display: inline-block;
  width: 50%;
  background: blueviolet;
}

svg {
  /* background: lightslategrey; */
}

polygon {
  stroke: black;
  stroke-opacity: 0.3;
  stroke-width: 2;
  filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);
}

text {
}
</style>
