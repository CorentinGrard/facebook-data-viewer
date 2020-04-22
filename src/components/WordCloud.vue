<template>
  <div>
    <canvas
      :style="{ width: width + 'px', height: height + 'px' }"
      :width="width * 7"
      :height="height * 7"
      ref="canvas"
    ></canvas>
  </div>
</template>
<script>
import WordCloud from "wordcloud";
export default {
  props: ["wordsList"],
  data() {
    return {
      width: 500,
      height: 500,
      nbElements: 100,
      minSize: 24,
    };
  },
  mounted() {
    const elements = this.wordsList.slice(0, this.nbElements);
    const canvas = this.$refs.canvas;
    WordCloud(canvas, {
      list: elements,
      minSize: this.minSize,
    });
  },
  watch: {
    wordsList: function(v) {
      const elements = v.slice(0, this.nbElements);
      const canvas = this.$refs.canvas;
      WordCloud(canvas, {
        list: elements,
        minSize: this.minSize,
      });
    },
  },
};
</script>
