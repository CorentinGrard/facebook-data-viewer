<template>
  <v-file-input
    multiple
    accept="application/json"
    @change="loadTextFromFile"
    chips
    label="Select your messages files"
  ></v-file-input>
</template>

<script>
import iconv from "iconv-lite";

export default {
  methods: {
    loadTextFromFile(files) {
      let result = [];
      if (files.length == 0) {
        this.$emit("change", result);
      }
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          let data = JSON.parse(e.target.result, (key, value) => {
            if (typeof value === "string") {
              let tmp = iconv.encode(value, "latin1");
              return iconv.decode(tmp, "utf-8");
            }
            return value;
          });
          result.push(data);
          if (result.length == files.length) {
            console.log("Files loaded");
            this.$emit("change", result);
          }
        };
        reader.readAsText(file);
      });
    },
  },
};
</script>
