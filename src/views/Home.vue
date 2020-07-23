<template>
    <div id="ui">
      <h1>Star Roller</h1>
      <router-link to="/dicer" class="btn" v-on:click.native="play('dicer-click')">Dicer</router-link>
      <router-link to="/hello" class="btn">hello</router-link>
      <img src="./../assets/img/rebeltrooper.png">
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