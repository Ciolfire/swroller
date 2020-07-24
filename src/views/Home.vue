<template>
    <div id="ui">
      <h1>STAR ROLLER</h1>
      <img style="transform: rotateY(180deg);margin-right:60%;" src="./../assets/img/rebeltrooper.png">
      <img src="./../assets/img/stormtrooper.png">
      <router-link to="/dicer" class="btn" v-on:click.native="play('dicer-click')">Dicer</router-link>
      <!-- <router-link to="/hello" class="btn">hello</router-link> -->
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

</style>
