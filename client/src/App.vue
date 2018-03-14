<template>
  <div id="app">
    <h1>start page</h1>
    <h2>{{messages}}</h2>
    <h2>{{text}}</h2>
        <tr>1<tr>
        <tr v-for="table in tables" :key="table.id">
          <td>{{table.id}}</td>
          <td>{{table.date}}</td>
          <td>{{table.name}}</td>
          <td>{{table.message}}</td>
        </tr>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      messages:'',
      text: '',
      tables: []
    }
  },
  components: {
    // HelloWorld
  },
  created () {
    this.get(),
    this.sum()
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
      // this.$socket.on('messages',(cont) => {
        // console.log(cont)
        //  this.post.id = cont.id
        //  this.posts.date = cont.date
        // console.log(this.posts)
      // })
      this.$socket.on('messages', function(cont){
        this.tables = cont          
        console.log(this.tables)
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
