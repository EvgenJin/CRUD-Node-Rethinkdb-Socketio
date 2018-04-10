import {Line} from 'vue-chartjs'
export default {
  extends: Line,
   data: () => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],  
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
      this.$socket.on('map',data => {
        this.chartdata = data.messages
        this.labels = data.dates
      // this.chartdata = [10, 11, 12, 13, 14, 15, 16]
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
    },
  },
  mounted () {
    this.fetch()
    // Vue.set(this.datas, 'datasets', this.datas);
  },
}