<template>
  <div id="app">
  <v-app>
   <v-content>
    <main_grid></main_grid>
    <chart></chart>
   </v-content>  
  </v-app>
</div>
</template>

<script>
import main_grid from './components/main_grid'
import chart from './components/chart'
export default {
  name: 'App',
  components: {
    main_grid,
    chart
  },
  created () {
  },
  updated () {
  },
  mounted () {
  },
  methods: {
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
}
</style>
