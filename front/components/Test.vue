<template>
  <div>
    <div v-if="loaded">
      {{ data }}
    </div>
  </div>
</template>

<script>

export default {
  name: "Test",
  data() {
    return {
      data: [],
      loaded: false,
    };
  },
  methods: {
    displayData() {
      this.$api.getTest()
        .then((res) => {
          console.log(res);
          this.data = res;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
    }
  },
  created() {
    this.displayData();
  }
};
</script>
