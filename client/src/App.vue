<template>
  <div id="app">
    <h1>start page</h1>
    <h2>{{messages}}</h2>
    <h2>{{text}}</h2>
  
 <table style="width:60%">
  <tr>
    <th>name</th>
    <th>message</th>
    <th>date</th>
  </tr>
  <tr v-for="object in objects" :key="object">
    <!-- <td>{{object.id}}</td> -->
    <td>{{object.name}}</td>
    <td>{{object.message}}</td>
    <td>{{object.date}}</td>
  </tr>
</table> 

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      messages:'',
      text: '',
      objects: []
    }
  },
  components: {
    // HelloWorld
  },
  created () {
    // this.get()
    // ,this.sum()
  },
  mounted () {
    this.sum()
  },
  methods: {
    get () {
      this.$socket.on('stream',(data) => {
      this.messages = data.title
      this.text = data.text
      // console.log('test')
      })
    },
    sum () {
      this.$socket.on('messages',data => {
        this.objects.push(data)
        // console.log(data)
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
