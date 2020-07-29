<template>
    <div id="ui">
      <div class="f-row">
        <img style="transform: rotateY(180deg);" src="./../assets/img/rebeltrooper.png">
        <h1>STAR ROLLER</h1>
        <img src="./../assets/img/stormtrooper.png">
      </div>
      <div class="f-row f-grow f-center" style="flex-direction:column">
        <router-link id="start-btn" to="/dicer" v-on:click.native="play('dicer-click')">Start</router-link>
      </div>
    </div>
</template>

<script>

export default {
  methods: {
    play: function(sound) {
      this.$root.play(sound);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: auto;
  width: auto;
  max-height: 65px;
  max-width: 66px;
}

#start-btn {
  width: 100%;
  font-size: xx-large;
  font-weight: normal;
  overflow: visible;
  text-align: center;
  font-family: starFont;
  color: #ffe81f;
  text-decoration: none;
  flex-grow: 1;
  line-height: 50vh;
}
</style>
