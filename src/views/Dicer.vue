<template>
  <div id="ui">
    <div>
			<svg width="100" height="100" style="background:rgb(255,255,255);">
				<rect x="25" y="25" width="50" height="50" style="fill:rgb(207,237,255);stroke-width:1;stroke:rgb(0,0,0)" />
			</svg>
		</div>
    <router-link to="/" class="btn" v-on:click.native="play('dicer-back')">Back</router-link>
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