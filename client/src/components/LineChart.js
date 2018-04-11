import {Line} from 'vue-chartjs'
export default {
  extends: Line,
   data: () => ({
    data: [],
    labels: []
  }),
  methods: {
    getMainData() {
      this.$root.$on('for_chart',data => {
        this.data = data
        let dates = data.map(function (item, index, array) {return item.date})
        let messages = data.map(function (item, index, array) {return item.message})
        this.labels = dates
        this.chartdata = messages
        this.datasets = [
          {
            label: 'Data Two',
            backgroundColor: '#05CBE1',
            data: this.chartdata
          }
        ],
        this.renderChart({labels:this.labels, datasets: this.datasets     
        }, {responsive: true, maintainAspectRatio: false})
      })
    }
  },
  mounted () {
    this.getMainData()
  }
}