<template>
    <div id="ui">
      <h1>Result</h1>
      <img style="transform: rotateY(180deg);margin-right:60%;" src="./../assets/img/rebeltrooper.png">
      <img src="./../assets/img/stormtrooper.png">
      <div class="btn">{{ this.rules.getResult() }}</div>
      <router-link to="/dicer" class="btn btn-lg" v-on:click.native="play('dicer-click')">Dicer</router-link>
      <!-- <router-link to="/hello" class="btn">hello</router-link> -->
    </div>
</template>

<script>
export default {
    data: function() {
    return {
      rules: this.rules
    }
  },
  created: function () {
    this.rules = this.$rules;
    this.rules.rollPool();
  },
  methods: {
    play: function(sound) {
        this.$root.play(sound);
    }
  },
};

// We shall do the following:
//
// 1. Fail, despair, threat         0/0 0/0
// 2. Fail, despair                 0/0 0/0
// 3. Fail, despair, advantage      0/0 0/0
// 4. Fail, threat                  0/0 0/0
// 5. Fail                          0/0 0/0
// 6. Fail, despair, triumph        0/0 0/0
// 7. Fail, advantage               0/0 0/0
// 8. Fail, triumph                 0/0 0/0
// 9. Fail, triumph, advantage      0/0 0/0
//
// 1. Success, despair, threat      1/6 2/6
// 2. Success, despair              2/6 2/6
// 3. Success, despair, advantage   3/6 2/6
// 4. Success, threat               3/6 2/6
// 5. Success                       4/6 2/6
// 6. Success, despair, triumph     5/6 3/6
// 7. Success, advantage            5/6 1/6
// 8. Success, triumph              5/6 0/6
// 9. Success, triumph, advantage   6/6 0/6
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
