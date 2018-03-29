<template>
  <div id="app">
  <v-app>
  <v-content>
    <!-- <test></test> -->
  <date-picker v-model="date1" format = "yyyy-MM-dd" lang = "ru" :first-day-of-week="1"></date-picker>
  <date-picker v-model="date2" lang = "ru" :first-day-of-week="1"></date-picker>
  <v-btn color="success" 
  
  v-on:click="push()"
  >Success</v-btn>
  <!-- <main_grid></main_grid> -->
  <p>{{date1}}</p>
  <p>{{date2}}</p>
  <!-- <add_record></add_record> -->
  
  <!-- <v-data-table
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
  </v-data-table> -->

<table style="width:60%">
<tr>
  <th>name</th>
  <th>message</th>
  <th>date</th>
</tr>
<tr v-for="(object,index) in objects" :key="index">
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
import test from './components/test'
export default {
  name: 'App',
  data () {
    return {
      objects: [],
      date1: '2018-03-25T00:00:00.000Z',
      date2: '2018-12-31T00:00:00.000Z',
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
    main_grid,
    test
  },
  created () {
    this.push()
  },
  mounted () {
    // this.push()
    // this.alert(),
    // this.test()
  },
  watch: {
    
  },
  methods: {
    push () {
        var dates = {
          date1: this.date1+1,
          date2: this.date2,
        }
        alert(this.date1)
      this.$socket.emit('test',dates);
      // alert("test")
      this.$socket.on('test',data => {
        // this.objects = data
        // this.objects.splice()
        // this.objects.push(data)
        // this.objects.push(data)
        console.log(data)
        this.objects = data
        // alert(this.date1)
      })

          // console.log(this.time1+1)
        // this.$socket.emit('querry',{date1:this.time1, date2: this.time2})
        // this.$socket.on('messages',data => {
        // this.items.push(data)
          // Vue.set(this.objects,'data',data)
        // console.log(this.time1 + '---' + this.time2)        
        // console.log(data)
      // })
    },
    change () {
      this.date1 = '2018-03-01T00:00:00.000Z'
      console.log(this.date1 + "  --  " + this.date2)
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
