<template>
  <div class="relative">
    <div class="flex justify-between items-start pb-4">
      <h1 class="text-lg text-sky-950 font-bold">Données de la salle {{ roomNumber }}</h1>
      <v-btn
        elevation="1"
        rounded-xl
        :to="editLink"
      >Modifier les paramètres de la salle
      </v-btn>
    </div>


    <div v-if="loaded" class="w-full">
      <SensorChart :title="'Température | °C'" :yaxis="chartData.temperature.yaxis" :xaxis="chartData.temperature.xaxis"/>
      <SensorChart :title="'Taux d\'humidité | %'" :yaxis="chartData.humidity.yaxis" :xaxis="chartData.humidity.xaxis"/>
      <SensorChart :title="'Niveau sonore | db'" :yaxis="chartData.soundLevel.yaxis" :xaxis="chartData.soundLevel.xaxis"/>
    </div>
    <div v-else>
      <v-skeleton-loader
        class="mx-auto"
        type="card"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card"
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
import { parseDataToChart } from "~/utils/jsonParser";

export default {

  name: "movieRoomPage",
  layout: "DefaultLayout",
  data() {
    return {
      roomNumber: "N/A",
      editLink: "",
      loaded: false,
      serverError: false,
      sensorsData: null,
      chartData: {
        temperature: Array,
        humidity: Array,
        soundLevel: Array,
      },
    }
  },
  methods: {
    displayData() {
      this.$api.getRoomInfo(this.roomNumber)
        .then((res) => {
          this.sensorsData = res.sensors;
          this.chartData.temperature = parseDataToChart(this.sensorsData.temperature);
          this.chartData.humidity = parseDataToChart(this.sensorsData.humidity);
          this.chartData.soundLevel = parseDataToChart(this.sensorsData.sound);
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
          this.serverError=true;
        });
    }
  },
  created() {
    this.roomNumber = this.$route.params.id;
    this.editLink = "/movieRoomSettings/" + this.roomNumber;
    this.displayData();

  }
};
</script>


