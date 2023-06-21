<template>
  <div class="py-4">
    <client-only>
      <ApexCharts type="area" height="300" :options="chartOptions" :series="series"></ApexCharts>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "SensorChart",
  props:{
    title : String,
    yaxis : Array,
    xaxis : Array,

  },
  data() {
    return {
      series: [{
        name: '',
        data: this.yaxis
      }],
      chartOptions: {
        chart: {
          width: "100%",
          height: 300,
          type: 'area'
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: this.title,
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          categories: this.xaxis
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  },
}
</script>

<style scoped>

</style>
