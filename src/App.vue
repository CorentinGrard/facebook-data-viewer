<template>
  <v-app id="inspire">
    <v-content>
      <h1>Facebook Data Viewer</h1>
      <FileReader @change="data = $event"></FileReader>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <TimeChart :chartData="dataNbMsgPerDay" :styles="timeChartStyle" />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <WordCloud :wordsList="datasetNbUsedWords" />
          <WordCloud :wordsList="datasetNbUsedEmoji" />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TimeChart from "./components/TimeChart";
import WordCloud from "./components/WordCloud";
import FileReader from "./components/FileReader";
import { processData } from "../public/processFacebook.js";

export default {
  title: "Facebook Data Viewer",
  name: "App",
  components: {
    TimeChart,
    WordCloud,
    FileReader,
  },
  data() {
    return {
      data: [],
      participants: [],
      dataNbMsgPerDay: {},
      datasetNbUsedEmoji: [],
      datasetNbUsedWords: [],
    };
  },
  watch: {
    data: function(data) {
      const result = processData(data);
      this.participants = result.participants;
      this.dataNbMsgPerDay = result.dataNbMsgPerDay;
      this.datasetNbUsedEmoji = result.datasetNbUsedEmoji;
      this.datasetNbUsedWords = result.datasetNbUsedWords;
    },
  },
  computed: {
    timeChartStyle() {
      return {
        height: "500px",
        position: "relative",
      };
    },
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
