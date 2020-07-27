<template>
  <div id="ui">
    <img
      style="transform: rotateY(180deg);margin-right:60%;"
      src="./../assets/img/rebeltrooper.png"
    />
    <img src="./../assets/img/stormtrooper.png" />
    <h5>
			<h1 v-if="this.rules.getResult('success') > 0">
				Success !!
			</h1>
			<h1 v-else>
				Fail ...
			</h1>
			<p style="font-size:1.2em;">
				<span class="failure" v-if="this.rules.getResult('success') < 0">{{ this.rules.getResult('success') * -1 }} <span class="star-symbol">f</span></span>
				<span class="success" v-else-if="this.rules.getResult('success') > 0">{{ this.rules.getResult('success') }} <span class="star-symbol">s</span></span>
				<span class="advantage" v-if="this.rules.getResult('advantage') > 0"> {{ this.rules.getResult('advantage') }} <span class="star-symbol">a</span></span>
				<span class="triumph" v-if="this.rules.getResult('triumph') > 0"> {{ this.rules.getResult('triumph') }} <span class="star-symbol">x</span></span>
				<span class="threat" v-if="this.rules.getResult('advantage') < 0"> {{ this.rules.getResult('advantage') * -1 }}<span class="star-symbol">t</span></span>
				<span class="despair" v-if="this.rules.getResult('despair') > 0"> {{ this.rules.getResult('despair') }}<span class="star-symbol">y</span></span>
				<br>
				<span class="light" v-if="this.rules.getResult('light') > 0"> {{ this.rules.getResult('light') }} <span class="star-symbol star-symbol-light">z</span></span>
				<span class="dark" v-if="this.rules.getResult('dark') > 0"> {{ this.rules.getResult('dark') }} <span class="star-symbol star-symbol-dark">Z</span></span>
			</p>
		</h5>
    <!-- <div class="btn">{{ this.rules.getResult() }}</div> -->
		<br>
		<br>
		<h5>details</h5>
		<div class="row" style="overflow:auto;flex-wrap:wrap">
				<div v-for="(item,index) in rules._resultDetail" :key="index">
					<svg class="col" height="25" viewBox="0 0 100 100">
						<polygon :class="'dice ' + item.type" :points="ressource('dice', item.type)"/>
					</svg>
					<span class="star-symbol star-symbol-light">{{ detailResult(item.roll)}}</span>
				</div>
		</div>
    <router-link to="/dicer" class="btn btn-lg" v-on:click.native="play('dicer-click')">Dicer</router-link>
  </div>
</template>

<script>
import Display from "./../Display.js";

export default {
  data: function () {
    return {
			rules: this.rules,
			Display: Display,
    };
  },
  created: function () {
    this.rules = this.$rules;
    this.rules.rollPool();
  },
  methods: {
    play: function (sound) {
      this.$root.play(sound);
		},
		ressource: function (category, type) {
			return Display[category].find(obj => obj.type == type)['src'];
		},
		detailResult: function (result) {
			let face = "";
			for (const property in result) {
				let value = result[property];
				let symbol = "";
				switch(property) {
					case 'success':
						if (value < 0) {
						value *= -1;
						symbol = "f";
						} else {
						symbol = "s";
						}
						break;
					case 'advantage':
						if (value < 0) {
						value *= -1;
						symbol = "t";
						} else {
						symbol = "a";
						}
						break;
					case 'triumph':
						symbol = "x";
						break;
					case 'despair':
						symbol = "y";
						break;
					case 'light':
						symbol = "z";
						break;
					case 'dark':
						symbol = "Z";
						break;
				}
				for (let i = 0; i < value; i++) { 
					face+=symbol;
				}
			}
			return face;
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
.success {
	color: rgb(105,155,224);
}

.advantage {
	color:rgb(33,84,163);
}

.triumph {
	color:rgb(58,53,156);
}

.failure {
	color:rgb(191,132,72);
}

.threat {
	color: darkorange;
}

.despair {
	color:darkred;
}

.good {
	color: darkblue;
}

.bad {
	color: darkred;
}

.light {
	color: white;
}

.dark {
  color:black;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
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
