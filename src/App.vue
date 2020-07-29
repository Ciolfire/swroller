<template>
  <div id="app">
    <router-view />
    <Background />
  </div>
</template>

<script>
import Background from "./components/Background.vue";

export default {
  name: "App",
  components: {
    Background,
  },
};
</script>

<style>
body {
  -webkit-touch-callout: none;
  /* prevent callout to copy image, etc when tap to hold */
  -webkit-text-size-adjust: none;
  /* prevent webkit from resizing text to fit */
  -webkit-user-select: none;
  /* prevent copy paste, to allow, change 'none' to 'text' */
  font-family: system-ui, -apple-system, -apple-system-font, "Segoe UI",
    "Roboto", sans-serif;
  font-size: 12px;
  height: 100vh;
  margin: 0px;
  /* Padding to avoid the "unsafe" areas behind notches in the screen */
  padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
           env(safe-area-inset-bottom, 0px) env(safe-area-inset-right, 0px);
  /* overflow: hidden; */
}

#app {
  display: flex;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#ui {
  display:flex;
  flex-direction: column;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  box-shadow: inset 0 0 50px #4273ae;
}

@font-face {
  font-family: "starFontO";
  src: url("assets/fonts/SF Distant Galaxy AltOutline.ttf");
}

@font-face {
  font-family: "starFont";
  src: url("assets/fonts/SF Distant Galaxy.ttf");
}

@font-face {
  font-family: "starSymbol";
  src: url("assets/fonts/EotE_Symbol-Regular_v1.otf");
  /* s(uccess), f(ailure), a(dvantage),t(hreat), x(triumph), y(despair),z(force) */
}

h1 {
  font-size: xxx-large;
  font-weight: normal;
  margin: 0px;
  overflow: visible;
  padding: 0px;
  text-align: center;
  font-family: starFontO;
  color: #ffe81f;
}

h5 {
  font-size: large;
  font-weight: normal;
  margin: 0px;
  overflow: visible;
  padding: 0px;
  text-align: center;
  font-family: starFont;
  color: #ffe81f;
}

.star-symbol {
  font-family: starSymbol;
}

.star-symbol-light {
  color:white;
}

.star-symbol-dark {
  color:white;
}

.btn {
	display: block;
  margin: 20px;
  overflow: visible;
  text-align: center;
  font-family: "starFontO";
  /* color: #4273ae; */
  color: #e0d648;
  border: 2px solid #4273ae;
  box-shadow: inset 0 0 10px #4273ae;
  font-size: x-large;
  background: black;
  cursor: pointer;
  text-decoration: none;
}

.btn-lg {
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-off {
  display: block;
  margin: 20px;
  overflow: visible;
  text-align: center;
  font-family: "starFontO";
  color: #202020;
  border: 2px solid #202020;
  box-shadow: inset 0 0 10px #202020;
  font-size: xx-large;
  text-decoration: none;
}

.btn:active {
  transform: scale(0.95);
  font-family: "starFont";
  box-shadow: inset 0 0 30px #4273ae;
}

/* FLEX */
.f-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.f-row {
  display: flex;
  margin: 0;
  /* margin: 3vh 2vw; */
  justify-content: space-between;
}

.f-col {
  margin: 0;
  flex-grow: 1;
}

.f-col-0 {
  flex-grow: 0;
}

.f-grow {
  flex-grow: 1;
}

.f-center {
  align-items: center;
}

.f-bottom {
  align-items: flex-end;
}

</style>