<template>
<<<<<<< HEAD
  <!-- <h1>test</h1> -->
  <!-- <v-btn color="success" v-on:click="test()">test</v-btn> -->
 <!-- первая таблица -->
 <div>
<v-btn color="success" v-on:click="test()">Success</v-btn>
 <table style="width:60%">
 <tr>
   <th>id</th>
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
 </div>
</template>

<script>
import Vue from 'vue'
export default {
name: 'App',
   data() {
      return {
         objects: []
      }
   },
    mounted () {
        this.test()
    },
    methods: {
    test () {
        // this.$socket.emit('querry',{date1:this.date1, date2: this.date2})
        this.$socket.on('messages',data => {
        this.objects.push(data)
        console.log(data)
      })
    }
    }
}      



=======
<div>
  <h1>Проверка</h1>
  <h1>{{ message }}</h1>
</div>  
</template>



<script>
export default {
  data() {
    return {
        message: ''
    }
  },      
  mounted () {
      this.message = '123'
  }
}
>>>>>>> 33636000f74e1ae8f38b35c621a8acda9aa439d5

</script>
