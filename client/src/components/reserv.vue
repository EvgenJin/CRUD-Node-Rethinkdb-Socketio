<template>
  <table style="width:60%">
<tr>
  <th>name</th>
  <th>message</th>
  <th>date</th>
</tr>
<tr v-for="(object,index) in objects" :key="index">
  <td>{{object.name}}</td>
  <td>{{object.message}}</td>
  <td>{{object.date}}</td>
   <v-btn v-on:click="del(object.id,index)">delete</v-btn>
</tr>
</table>
</template>


<script>
export default {
    name: 'App',
  data () {
    return {
      objects: [],
      date1: moment().format('YYYY-MM-DD'),
      date2: moment().add(7, 'days').format('YYYY-MM-DD')
      // headers: [
      //     {text: 'name', align: 'center', value: 'name'},
      //     {text: 'message', value: 'message',align: 'center' },
      //     {text: 'date', value: 'date', align: 'center' },
      //   ],
      //    items: [],
      // shortcuts: [
      //   {
      //     text: 'Today',
      //     start: new Date(),
      //     end: new Date()
      //   }
      // ]         
    }
    methods: {
            get () {
        var dates = {
           date1: moment(this.date1).format('YYYY-MM-DD'),
           date2: moment(this.date2).format('YYYY-MM-DD')
        }
      this.$socket.emit('test',dates);
      this.$socket.on('test',data => {
      this.objects = data
      })
      
    },
    // изменения тест
    changes () {
      this.$socket.on('changes',data => {
        this.objects.push(data)
      })
    },
    post () {
      this.$root.$on('insert',add_data => {
        this.$socket.emit('messages',add_data);
        this.objects.push(add_data);
    })
    },
    del (id,index) {
      // console.log(id + '--' + index)
      this.$socket.emit('delete',id) 
      this.$delete(this.objects, index)
    }
    }
}
}
</script>