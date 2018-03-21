<template>
  <div id="app">
  <v-app>
  <v-content>
  <date-picker v-model="time1" lang = "ru" :first-day-of-week="1"></date-picker>
  <v-btn color="success" v-on:click="push()">Success</v-btn>
  <p>{{time1}}</p>
    <add_record></add_record>

  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.message }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
    </template>
  </v-data-table>
</v-content>  
</v-app>
</div>
</template>

<script>
import add_record from './components/add_record'
import DatePicker from 'vue2-datepicker'
export default {
  name: 'App',
  data () {
    return {
      objects: [],
      date1: '2018-03-01T00:00:00.000Z',
      date2: '2018-05-23T00:00:00.000Z',
      user: {
        name: '',
        message: 0,
        date: ''
      },
      headers: [
          {text: 'name', align: 'center', value: 'name'},
          {text: 'message', value: 'message',align: 'center' },
          {text: 'date', value: 'date', align: 'center' },
        ],
         items: [],
      time1: '2018-01-01T00:00:00.000Z',
      time2: '2018-12-31T00:00:00.000Z',
      shortcuts: [
        {
          text: 'Today',
          start: new Date(),
          end: new Date()
        }
      ]         
    }
  },
  components: {
    add_record,
    DatePicker
  },
  created () {
  },
  mounted () {
    //  this.push()
  },
  methods: {
    push () {
          // console.log(this.time1+1)
        this.$socket.emit('querry',{date1:this.date1, date2: this.date1+30})
        this.$socket.on('messages',data => {
        this.items.push(data)
        // console.log(this.time1 + '---' + this.time2)
        // console.log(this.time1)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  padding: 10px;
}
</style>
