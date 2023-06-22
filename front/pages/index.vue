<template>
  <div>
    <div v-for="(room, index) in sensorsData" :key="index">
      <MovieRoomOverview :temp=room.temperature />
    </div>

  </div>
</template>

<script>
import {parseDataToChart} from "~/utils/jsonParser";

export default {
  name: "IndexPage",
  layout: "DefaultLayout",
  data() {
    return {
      loaded: false,
      serverError: false,
      sensorsData: null,
    }
  },
  methods: {
    displayData() {
      this.$api.getAllInfo()
        .then((res) => {
          console.log(res)
          this.sensorsData = res.sensorSummary;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
          this.serverError=true;
        })
        .finally();
    }
  },
  created() {

    this.displayData();

  }
};
</script>


