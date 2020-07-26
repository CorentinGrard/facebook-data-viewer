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
        <v-container v-else>
          <p>This website will show you some data about your facebook message.</p>
          <p>To use the website you need to first downlaod your facebook data. To do so go on : Setting --> Your facebook information --> Download your information --> Select the Json format --> Select "Messages" --> Click on "Create File"</p>
          <p>Once your data are ready, download them and select on the website the conversation you want to analyse.</p>
          <p>
            All the data stay on your computer and you can look at the source code
            <a href="https://github.com/CorentinGrard/facebook-data-viewer">here</a>
          </p>
        </v-container>
      </v-container>
    </v-main>
    <v-footer app class="d-flex justify-center">
      Made by
      <a href="https://github.com/CorentinGrard">Corentin Grard</a> -
      <a href="https://github.com/CorentinGrard/facebook-data-viewer">Source code</a>
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
      console.log(this.datasetNbUsedWords);
    },
  },
};
</script>
