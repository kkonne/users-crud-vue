<template>
  <div class="home">
    <div class="header">
      <h1>Users CRUD</h1>

      <input v-model="userSearchInput" type="text" placeholder="Search by name...">
      <button type="button" @click="searchUsers">Search</button>
    </div>

    <div v-if="searchResult.length > 1">
      <UserSearchResult v-for="(user, i) in searchResult" :key="i" :user="user" />
    </div>
    <div v-else>
        <div v-if="users">
          {{ users.length }} users found.
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserSearchResult from "../components/UserSearchResult.vue"

Vue.use(VueAxios, axios)

export default {
  name: 'Home',

  components: {UserSearchResult},

  data(){
    return {
      users: undefined,
      userSearchInput: "",
    }
  },

  async created(){
    await this.fetchUsers()
  },

  methods: {
    async fetchUsers(){

      await this.axios.get()
      .then((response) => {
        this.users = response.data
      })
    },

    async searchUsers(){
      await this.fetchUsers();
      
      const searchInput = this.userSearchInput.trim().toLowerCase();

      let usersResult = [];

      this.users.forEach(user => {
        const doesUserMatch = user.name.toLowerCase().search(searchInput);

        if(doesUserMatch === -1) return; // if user doesnt match

        usersResult.push(user);

      })

      if(!usersResult.length) { // no users matching the query search
        this.$store.commit("updateUserSearchResult", []);
        console.log("No matching users found!");
        return;
      }
      
      this.$store.commit("updateUserSearchResult", usersResult);

      this.userSearchInput = "";
    }
  },

  computed: {
      searchResult(){
          return this.$store.getters.getUserSearchResult
      },
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 50px auto;
}
</style>