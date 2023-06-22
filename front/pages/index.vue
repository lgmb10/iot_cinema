<template>
  <div class="relative">
    <div v-if="loaded" class="flex flex-row gap-5 flex-wrap justify-center">
      <MovieRoomOverview
        v-for="(room, index) in sensorsData" :key="index"
        :temp=room.temperature.value
        :temp-time=room.temperature.date
        :humidity=room.humidity.value
        :humidity-time=room.humidity.date
        :sound-level=room.sound
        :room-number=index.slice(-1)
      />
    </div>
    <div v-else>
      <v-skeleton-loader
        class="mx-auto"
        max-width="500"
        type="article, actions"
        elevation="5"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        max-width="500"
        type="article, actions"
        elevation="5"
      ></v-skeleton-loader>
    </div>

    <div v-if="serverError" class="absolute top-3 left-1/2 alert_error">
      <v-alert
        color="red"
        elevation="2"
        type="error"
        dismissible
      >&nbsp;Une erreur s'est produite&nbsp;</v-alert>
    </div>
  </div>
</template>

<script>

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
          this.serverError = true;
        });
    }
  },
  created() {
    this.displayData();
  }
};
</script>


