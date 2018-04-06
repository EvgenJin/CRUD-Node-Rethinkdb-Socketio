import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data Two',
        backgroundColor: '#05CBE1',
        data: [10, 55, 32, 10, 2, 12, 53]
      }
    ]
  }),
  mounted () {
    this.renderChart({labels:this.labels, datasets: this.datasets     
    }, {responsive: true, maintainAspectRatio: false})
  }
}