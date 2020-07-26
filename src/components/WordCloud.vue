<template>
  <v-card>
    <v-card-title align="center" justify="center">{{title}}</v-card-title>
    <v-card-text>
      <canvas
        :style="{ width: options.width + 'px', height: options.height + 'px' }"
        :width="options.width * 5"
        :height="options.height * 5"
        ref="canvas"
      ></canvas>
    </v-card-text>
  </v-card>
</template>
<script>
import WordCloud from "wordcloud";
export default {
  props: {
    title: String,
    wordsList: Array,
    options: {
      type: Object,
      required: false,
      default: function () {
        return {
          minRotation: 0,
          maxRotation: 0,
          width: 500,
          height: 500,
          nbElements: 100,
          minSize: 24,
        };
      },
    },
  },
  mounted() {
    const elements = this.wordsList.slice(0, this.options.nbElements);
    const canvas = this.$refs.canvas;
    WordCloud(canvas, {
      list: elements,
      minSize: this.options.minSize,
      minRotation: this.options.minRotation,
      maxRotation: this.options.maxRotation,
      shrinkToFit: true,
    });
  },
  watch: {
    wordsList: function (v) {
      const elements = v.slice(0, this.options.nbElements);
      const canvas = this.$refs.canvas;
      WordCloud(canvas, {
        list: elements,
        minSize: this.options.minSize,
        minRotation: this.options.minRotation,
        maxRotation: this.options.maxRotation,
        shrinkToFit: true,

      });
    },
  },
};
</script>
