<template>
  <div id="app">
  <v-app>
  <v-content>
  <date-picker v-model="time1" lang = "ru" :first-day-of-week="1"></date-picker>
  <v-btn color="success" v-on:click="send()">Success</v-btn>
  <p>{{time1}}</p>
  <main_grid></main_grid>
    <add_record></add_record>

  <!-- <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.message }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
    </template>
  </v-data-table> -->

 <table style="width:60%">
 <tr>
   <th>name</th>
   <th>message</th>
   <th>date</th>
 </tr>
 <tr v-for="object in objects" :key="object.id">
   <td>{{object.id}}</td>
   <td>{{object.name}}</td>
   <td>{{object.message}}</td>
   <td>{{object.date}}</td>
 </tr>
 </table>

</v-content>  
</v-app>
</div>
</template>

<script>
import add_record from './components/add_record'
import DatePicker from 'vue2-datepicker'
import main_grid from './components/main_grid'
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
    DatePicker,
    main_grid
  },
  created () {
  },
  mounted () {
    //  this.push(),
     this.send()
  },
  methods: {
       push () {
         this.$socket.on('test',data => {
          //  console.log(dates)
      })
    },
    send () {
        var data = {
           date1: '2018-01-01T00:00:00.000Z',
           date2: '2018-12-31T00:00:00.000Z'
        }
      this.$socket.emit('test',data)
      this.$socket.on('test',data => {
          //  console.log(data)
      })  

      this.objects = [{ date: "2018-03-31T00:00:00.000Z"
                      , id: "206959b2-b1fe-43ed-a733-734ec153fc4c"
                      , message: "2"
                      , name: "2" },
{ date: "2018-03-31T00:00:00.000Z"
                      , id: "206959b2-b1fe-43ed-a733-734ec153fc2c"
                      , message: "3"
                      , name: "3" }
                      ]
      // console.log(data)
      // data = JSON.stringify( data )
      // console.log(data)
      // this.objects = data
      console.log(this.objects)                      
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
