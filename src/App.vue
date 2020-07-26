<template>
  <v-app>
    <v-app-bar app hide-on-scroll class="d-flex justify-center primary">
      <h1>Facebook Data Viewer</h1>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <FileReader @change="data = $event"></FileReader>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-container fluid v-if="data.length > 0">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <TimeChart :chartData="dataNbMsgPerDay" />
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <WordCloud class="mr-4" title="Most used words" :wordsList="datasetNbUsedWords" />
            <WordCloud class="mr-4" title="Most used emoji" :wordsList="datasetNbUsedEmoji" />
            <v-card class="mr-4">
              <v-card-title>Statistics</v-card-title>
              <v-card-text>Total number of messages : {{nbTotalMsg}}</v-card-text>
              <v-card-text>Days of conversation : {{duration}}</v-card-text>
              <v-card-text>Messages per day : {{msgPerDay}}</v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
    <v-footer app class="d-flex justify-center">
      Made by Corentin Grard -
      <a
        href="https://github.com/CorentinGrard/facebook-data-viewer"
      >Source code</a>
    </v-footer>
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
      duration: 0,
      nbTotalMsg: 0,
      msgPerDay: 0,
      dataNbMsgPerDay: {},
      datasetNbUsedEmoji: [],
      datasetNbUsedWords: [],
    };
  },
  watch: {
    data: function (data) {
      const result = processData(data);
      this.participants = result.participants;
      this.dataNbMsgPerDay = result.dataNbMsgPerDay;
      this.datasetNbUsedEmoji = result.datasetNbUsedEmoji;
      this.datasetNbUsedWords = result.datasetNbUsedWords;
      this.duration = result.duration;
      this.nbTotalMsg = result.nbTotalMsg;
      this.msgPerDay = result.msgPerDay;
    },
  },
};
</script>
