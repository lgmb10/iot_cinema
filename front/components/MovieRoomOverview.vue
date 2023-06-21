<template>
  <div class="w-fit flex flex-col justify-center items-center bg-slate-100 px-5 pt-3 pb-5 inline-block rounded-2xl">
    <h2 class="text-xl font-semibold text-sky-950 border-b-2 border-slate-300 w-full text-center pb-2">Salle 1</h2>
    <p class="text-sm py-2">Informations en temps réel</p>
    <div class="flex gap-2 pb-3">
      <div class="relative w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-green-300 border-2">
        <p class="text-sm">Température</p>
        <p class="font-bold text-lg">22.5°C</p>
        <span class="display-block text-xs text-slate-500">12h50</span>

      </div>
      <div class="w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-green-300 border-2">
        <p class="text-sm">Humidité</p>
        <p class="font-bold text-lg">64%</p>
        <span class="display-block text-xs text-slate-500">12h50</span>
      </div>
      <div class="text-center w-28 bg-white rounded-2xl px-2 py-3 flex flex-col justify-center items-center border-orange-300 border-2">
        <p class="text-sm">Niveau Sonore</p>
        <p class="font-bold text-lg">105 db</p>
        <span class="display-block text-xs text-slate-500">moyenne de la dernière heure</span>
      </div>
    </div>
    <v-btn
      elevation="1"
      rounded-xl
      to="/movieRoom/1"
    >Détails</v-btn>
  </div>
</template>

<script>
export default {
  name: "movieRoomOverview",
  props: {
    info: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style scoped>

</style>
