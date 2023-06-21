<template>
  <div>
    <div class="flex justify-between items-start pb-4">
      <h1 class="text-lg text-sky-950 font-bold">Données de la salle {{ roomNumber }}</h1>
      <v-btn
        elevation="1"
        rounded-xl
        :to="editLink"
      >Modifier les paramètres de la salle
      </v-btn>
    </div>

    <div class="w-full">
      <SensorChart :title="'Température | °C'" :yaxis="tempYaxis" :xaxis="tempXaxis"/>
      <SensorChart :title="'Taux d\'humidité | %'" :yaxis="tempYaxis" :xaxis="tempXaxis"/>
      <SensorChart :title="'Niveau sonore | db'" :yaxis="tempYaxis" :xaxis="tempXaxis"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "movieRoomPage",
  layout: "DefaultLayout",
  data() {
    return {
      roomNumber: "N/A",
      editLink: "",
      tempXaxis: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      tempYaxis: [22.5, 23, 24, 23.5, 22.5, 21, 21.5],
    }
  },
  created() {
    this.roomNumber = this.$route.params.id;
    this.editLink = "/movieRoomSettings/" + this.roomNumber;
  }
};
</script>


