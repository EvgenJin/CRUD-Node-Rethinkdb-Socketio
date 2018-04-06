<template>
  <v-layout row wrap>
      <!-- <v-flex xs3 align-center=true> -->
<form>
  <v-text-field v-model="user.name" label="Name" data-vv-name="name"></v-text-field>
  <v-text-field v-model="user.message" label="message" data-vv-name="message"></v-text-field>
    <v-flex>
      <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" 
        transition="scale-transition"
        offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="date">
        <v-text-field slot="activator"  label="Picker in menu" v-model="user.date"
          prepend-icon="event" readonly>
        </v-text-field>
        <v-date-picker v-model="user.date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-btn @click="Submit">submit</v-btn>
    <!-- <v-btn @click="clear">clear</v-btn> -->
  </form>
      <!-- </v-flex> -->
  </v-layout>
</template>

<script>
import moment from 'moment'
  export default {
    data: () => ({
      date: null,
      menu: false,
      modal: false,
      user: {
        email: '',
        name: '',
        message: 0,
        date: ''
      }
      
    }),
    methods: {
      Submit() {
        var add_data = {
          name: this.user.name,
          message: this.user.message,
          date: moment(this.user.date).format('YYYY-MM-DD')
        }
      this.$root.$emit('insert',add_data);
      // this.$socket.emit('messages',data);
      // console.log(data)
      }
    }

  }
</script>