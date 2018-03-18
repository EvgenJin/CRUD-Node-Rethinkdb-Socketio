<template>
  <div id="app">
  <v-app>
  <v-content>
    <add_record></add_record>

  <!-- первая форма -->
  <!-- <form @submit.prevent="handleSubmit"> -->
    <!-- <label>Name:<input type="text" v-model="user.name"/></label> -->
    <!-- <label>message:<input type="number" v-model="user.message"/></label> -->
    <!-- <label> -->
    <!-- </label> -->
    <!-- <label><datepicker></datepicker></label> -->
    <!-- <label><datepicker v-model="user.date"></datepicker></label> -->
    <!-- <button type="submit">Submit</button> -->
  <!-- </form> -->

 <!-- первая таблица -->
 <!-- <table style="width:60%">
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
</table> -->

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
export default {
  name: 'App',
  data () {
    return {
      objects: [],
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
         items: []
    }
  },
  components: {
    add_record
  },
  created () {
    //  this.push()
  },
  mounted () {
    this.push()
  },
  methods: {
    get () {
      this.$socket.on('stream',(data) => {
      this.messages = data.title
      this.text = data.text
      })
    },
    push () {
      this.$socket.on('messages',data => {
        this.items.push(data)
      })
    },
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
