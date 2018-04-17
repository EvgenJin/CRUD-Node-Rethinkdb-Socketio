<template>
  <div>
  <!-- фильтр дат   -->
  <date-picker v-model="date1" format = "YYYY-MM-DD" lang = "ru" :first-day-of-week="1"></date-picker>
  <date-picker v-model="date2" lang = "ru" :first-day-of-week="1"></date-picker>
  <v-btn color="success" v-on:click="initialize()">Фильтровать</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Добавить запись</v-btn>
      <!-- форма добавления -->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex>
                <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" 
                      transition="scale-transition" offset-y full-width :nudge-right="40" 
                      min-width="290px">
                  <v-text-field slot="activator"  label="Picker in menu" 
                                v-model="editedItem.date"
                                prepend-icon="event" readonly>
                  </v-text-field>
                  <v-date-picker v-model="editedItem.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(editedItem.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Message" v-model="editedItem.message"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- таблица -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.message }}</td>
        <td>
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item, props.item.id)">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
  export default {
    data: () => ({
      dialog: false,
      menu: false,
      date1: moment().format('YYYY-MM-DD'),
      date2: moment().add(7, 'days').format('YYYY-MM-DD'),
      headers: [
        { text: 'name',value: 'name'},
        { text: 'date',value: 'date' },
        { text: 'message',value: 'message'},
        { text: 'Actions',value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        date: '',
        message: 0
      },
      defaultItem: {
        name: '',
        date: '',
        message: 0
      }
    }),
    components: {
    DatePicker
  },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        var dates = {
            date1: moment(this.date1).format('YYYY-MM-DD'),
            date2: moment(this.date2).format('YYYY-MM-DD')
          }
        this.$socket.emit('test',dates);
        this.$socket.on('test',data => {
        this.items = data
        this.$root.$emit('for_chart',data);
        })
      },
      get_changes() {
        this.$socket.on('changes',data => {
          console.log(data)
        })
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item,id) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1) && this.$socket.emit('delete',id)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
          var edit_data = {
            id: this.editedItem.id,
            name: this.editedItem.name,
            message: this.editedItem.message,
            date: this.editedItem.date
          }
            this.$socket.emit('update',edit_data)
            // console.log(edit_data)
        } else {
        var add_data = {
          name: this.editedItem.name,
          message: Number(this.editedItem.message),
          date: moment(this.editedItem.date).format('YYYY-MM-DD')
        }
        this.$socket.emit('messages',add_data)
        this.items.push(add_data)
          // console.log(add_data)
        }
        this.close()
      }
    }
  }
</script>