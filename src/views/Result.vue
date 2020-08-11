<template>
  <div id="ui">
    <h5 class="result">
		<h1 v-if="this.rules.getResult('success') > 0" class="success">
		{{ $t('SUCCESS') }}
		</h1>
		<h1 v-else class="failure">
		{{ $t('FAILURE') }}
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
		<br>
		<br>
		<h5>{{ $t('DETAILS') }}</h5>
		<div class="f-row" style="height:0px;">
				<div v-for="(item,index) in rules._resultDetail" :key="index">
					<svg class="f-col" height="30" viewBox="0 0 100 100">
						<polygon :class="'dice ' + item.type" :points="ressource('dice', item.type)"/>
					</svg>
					<span class="star-symbol star-symbol-light">{{ detailResult(item.roll)}}</span>
				</div>
		</div>
		<Animation />
		<div class="f-row f-bottom f-grow">
			<router-link to="/dicer" class="btn btn-lg f-grow" v-on:click.native="play('dicer-click')">{{ $t('REROLL') }}</router-link>
		</div>
  </div>
</template>

<script>
import Animation from "../components/Animation.vue";
import Display from "../Display.js";

export default {
	components: {
    Animation,
  },
  data: function () {
    return {
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
						return "x";
					case 'despair':
						return "y";
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
</script>

<i18n>
{
  "en": {
    "SUCCESS": "Success !",
		"FAILURE": "Failure...",
		"DETAILS": "Details",
		"REROLL": "New Roll"
  },
  "fr": {
		"SUCCESS": "Réussite !",
    "FAILURE": "Echec...",
		"DETAILS": "Détails",
		"REROLL": "Nouveau lancer"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.result {
	padding-top: 15px;
}

.f-row {
	flex-wrap:wrap;
	width: 80%;
	margin: auto;
	justify-content: flex-start;
}

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
  filter: drop-shadow(rgba(255, 255, 255, 1) 0px 0px 10px);
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

.btn-lg {
	font-size:x-large;
}
</style>
