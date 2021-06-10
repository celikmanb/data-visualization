<template>
  <div class="small">
    <apexchart v-if="visible" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>

export default {
    props: {
      chartData: {
        default: []
      },
      tab: {
        default: 1
      },
      graphName: {
        default: "Graph"
      },
      visible: true
    },
    watch:{
      tab(){
        if(this.tab == 1){
          this.series[0].data = this.chartData
        }
      },
      chartData() {
        this.visible = false
        this.updateChart()  
      }
    },
    created() {
      this.visible = true
    },
    methods: {
      updateChart() {
        this.series[0].data = this.chartData
        this.visible = true
      }
    },
    data () {
      return {
        series: [{
            name: this.graphName,
            data: this.chartData
        }],  
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: `${this.graphName} Data`,
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: 'datetime'
          },
        },
      }
    },
  }
</script>

<style>

</style>