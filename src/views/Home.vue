<template>
  <div class="home">
    <div class="header">
      <h1>Users CRUD</h1>

      <input v-model="userSearchInput" type="text" placeholder="Search by name..." class="search-input">
      <button type="button" @click="searchUsers" class="search-button">Search</button>
    </div>

    <!-- <FormModal v-if="isModalVisible" @closeModal="unselectUser" /> -->

    <div class="container">
      <div v-if="searchResult.length > 1">
        <table>
          <tr>
            <th class="avatar-column">Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>

          <UserSearchResult v-for="(user, i) in searchResult" :key="i" :user="user" />

        </table>
        
        
      </div>
      <div v-else>
          <div v-if="users">
            {{ users.length }} users found.
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserSearchResult from "../components/UserSearchResult.vue"
// import FormModal from "../components/FormModal.vue"

Vue.use(VueAxios, axios)

export default {
  name: 'Home',

  components: { UserSearchResult },

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
    },

    // unselectUser(){
    //   this.$store.commit('unselectUser');
    // },
  },

  computed: {
    searchResult(){
      return this.$store.getters.getUserSearchResult
    },
    
    // isModalVisible(){
    //   return this.$store.getters.isUserSelected(this.user)
    // },
  }
}
</script>

<style lang="scss">
.header {
  padding: 5rem 0;
  background-color: #ffc1cd;
}

.search-input, .search-button {
  padding: .5rem;
}

.search-input {
  border: 1px solid;
  border-color: rgba(0,0,0,0.5);
  outline: none;

  &:hover {
    border-color: rgba(0,0,0,1);
  }

  &:focus {
    border-color: rgba(0,0,0,.8);
  }
}

.search-button {
  border: 1px solid #363636;
  background-color: #363636;
  color: #f1f1f1;
}

.container {
  width: 85%;
  margin: 30px auto;
}

table {
  width: 100%;
}

table {
  border: 1px solid #363636;
  border-collapse: collapse;

  th, td {
    border: 1px solid #363636;
    border-collapse: collapse;
    padding: .5rem;
  }
}

.avatar-column {
  width: 50px;
}
</style>