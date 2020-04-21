<template>
  <div id="app">
    <h1>Facebook Data Viewer</h1>
    <FileReader @change="data = $event"></FileReader>
    <TimeChart :chartData="{}" :options="{}" />
    <MostUsedWords />
    <MostUsedEmoji />
  </div>
</template>

<script>
import TimeChart from "./components/TimeChart";
import MostUsedWords from "./components/MostUsedWords";
import MostUsedEmoji from "./components/MostUsedEmoji";
import FileReader from "./components/FileReader";
import { processData } from "../public/processFacebook.js";

export default {
  name: "App",
  components: {
    TimeChart,
    MostUsedWords,
    MostUsedEmoji,
    FileReader,
  },
  data() {
    return {
      data: [],
      participants: [],
      datasetNbMsgPerDay: [],
      datasetNbUsedEmoji: [],
      datasetNbUsedWords: [],
    };
  },
  watch: {
    data: function(data) {
      const result = processData(data)
      this.participants = result.participants
      this.datasetNbMsgPerDay = result.datasetNbMsgPerDay
      this.datasetNbUsedEmoji = result.datasetNbUsedEmoji
      this.datasetNbUsedWords = result.datasetNbUsedWords
    }
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
