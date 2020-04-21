<template>
  <div id="app">
    <h1>Facebook Data Viewer</h1>
    <input type=file multiple accept=".json" v-on="cli">
    <TimeChart :chartData="{}" :options="{}" />
    <MostUsedWords />
    <MostUsedEmoji />
  </div>
</template>

<script>
import TimeChart from "./components/TimeChart.vue";
import MostUsedWords from "./components/MostUsedWords.vue";
import MostUsedEmoji from "./components/MostUsedEmoji.vue";
import {
  processFile,
  participants,
  datasetNbMsgPerDay,
  datasetNbUsedWords,
  datasetNbUsedEmoji,
} from "./assets/processFacebook.js";

export default {
  name: "App",
  components: {
    TimeChart,
    MostUsedWords,
    MostUsedEmoji,
  },
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
