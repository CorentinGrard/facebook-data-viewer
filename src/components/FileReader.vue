<template>
  <v-file-input
    multiple
    accept="application/json"
    @change="loadTextFromFile"
  ></v-file-input>
</template>

<script>
export default {
  methods: {
    loadTextFromFile(files) {
      let result = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          result.push(JSON.parse(e.target.result));
          this.$emit("change", result);
        };
        reader.readAsText(file);
      });
    },
  },
};
</script>
