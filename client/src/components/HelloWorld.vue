<template>
<!-- <h2>{{msg}}</h2> -->
<h2>{{messages}}</h2>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      messages: '1'
    }
  },
  methods: {
    get () {
      this.$socket.on('stream', function(data){
        this.messages = data.title
        console.log(this.messages + 'первое')
      })
      console.log(this.messages + 'второе')
    }
  },   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
