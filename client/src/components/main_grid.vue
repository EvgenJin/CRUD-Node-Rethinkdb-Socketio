<template>
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

</script>
