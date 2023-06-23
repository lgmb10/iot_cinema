<template>
  <div class="overview_container grow-0 flex flex-col justify-center items-center bg-slate-100 px-5 pt-3 pb-5 inline-block rounded-2xl">
    <h2 class="text-xl font-semibold text-sky-950 border-b-2 border-slate-300 w-full text-center pb-2">Salle {{ roomNumber }}</h2>
    <p class="text-sm py-2">Informations en temps réel</p>
    <div class="flex gap-2 pb-3">
      <div
        class="relative w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-green-300 border-2" :class="{'border-orange-300': tempAlert}">
        <p class="text-sm">Température</p>
        <p class="font-bold text-lg">{{ data.temperature.value }}°C</p>
        <span class="display-block text-xs text-slate-500">{{ getTime(data.temperature.date) }}</span>

      </div>
      <div
        class="w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-green-300 border-2" :class="{'border-orange-300': humidityAlert}">
        <p class="text-sm">Humidité</p>
        <p class="font-bold text-lg">{{ data.humidity.value }}%</p>
        <span class="display-block text-xs text-slate-500">{{ getTime(data.humidity.date) }}</span>
      </div>
      <div
        class="text-center w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-green-300 border-2" :class="{'border-orange-300': soundAlert}">
        <p class="text-sm">Niveau Sonore</p>
        <p class="font-bold text-lg">{{ data.sound.average }} db</p>
        <span class="display-block text-xs text-slate-500">moyenne de la dernière heure</span>
      </div>
    </div>
    <v-btn
      elevation="1"
      rounded-xl
      :to="'/movieRoom/'+roomNumber"
    >Détails
    </v-btn>

  </div>
</template>

<script>
export default {
  name: "movieRoomOverview",
  props: {
    roomNumber : { default: "NaN"},
    data : { type: Object, default: null},
  },
  data(){
    return{
      tempAlert: this.checkLimit(this.data.temperature.value, this.data.temperature),
      humidityAlert: this.checkLimit(this.data.humidity.value, this.data.humidity),
      soundAlert: this.checkLimit(this.data.sound.average, this.data.sound),
    }
  },
  methods: {
    getTime(date) {
      let time =  new Date(date);
      return ("0" + time.getHours()).slice(-2) + 'h' + ("0" + time.getMinutes()).slice(-2);
    },
    checkLimit(sensorValue, sensor){
      return sensorValue > (sensor.range.max * 0.98) || sensorValue < (sensor.range.min * 1.02);
    }
  },
  created() {
    this.tempAlert=this.checkLimit(this.data.temperature.value, this.data.temperature)
  }
}
</script>

<style lang="css" scoped>
.overview_container{
  max-width: 393px;
}
</style>
