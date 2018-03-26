<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Breed</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(cat,index) in cats" :key="index">
        <td>{{cat.name}}</td>
        <td>{{cat.age}}</td>
        <td>{{cat.breed}}</td>
        <td>{{cat.gender}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import Vue from 'vue'
export default{
  data () {
      return {
          cats:[]
      }
  },
  created () {
    fetch('https://api.myjson.com/bins/s9lux')
    .then(res => res.json())
    // console.log(res)
    .then(res => {
      this.cats = res
      console.log(res)
    })
  }
}
</script>

