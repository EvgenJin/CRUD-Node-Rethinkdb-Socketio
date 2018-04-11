import {Line} from 'vue-chartjs'
export default {
  extends: Line,
   data: () => ({
    labels: [],  
    datasets: [
      {
        label: 'Data Two',
        backgroundColor: '#05CBE1',
        data: []
      }
    ],
  }),
  methods: {
    fetch() {
      // this.$socket.on('map',data => {
      //   this.chartdata = data.messages
      // this.labels = ['January1', 'February1', 'March1', 'April1', 'May1', 'June1', 'July1']
      // this.chartdata = [10, 11, 12, 13, 14, 15, 16]
      // this.datasets = [
      //   {
      //     label: 'Data Two',
      //     backgroundColor: '#05CBE1',
      //     data: this.chartdata
      //   }
      // ],
      // console.log(this.labels)
      // this.renderChart({labels:this.labels, datasets: this.datasets     
      // }, {responsive: true, maintainAspectRatio: false})
    // })
    },
    getMainData() {
      this.$root.$on('for_chart',data => {
        let dates = data.map(function (item, index, array) {
          return item.date
        })
        let messages = data.map(function (item, index, array) {
          return item.message
        })
          // console.log(dates)
          // console.log(messages)
          this.chartdata = dates
          this.labels = messages
          this.datasets = [
            {
              label: 'Data Two',
              backgroundColor: '#05CBE1',
              data: this.chartdata
            }
          ]
          // this.renderChart({labels:this.labels, datasets: this.datasets     
          // }, {responsive: true, maintainAspectRatio: false})
      })
      console.log(this.labels)
    }
  },
  mounted () {
    this.getMainData(),
    this.fetch()
    // Vue.set(this.datas, 'datasets', this.datas);
  },
}