<template>
      <tr>
          <td class="avatar-column">
              <img :src="user.avatar" class="avatar-column">
          </td>
          <td>
              {{ user.name }}
          </td>
          <td>
              {{ user.email }}
          </td>
          <td>
              {{ formattedDate(user.createdAt) }}
          </td>
          <td>
              <button @click="selectUser" type="button" class="action-button edit-button">Edit</button>
              <br>
              <button @click="deleteUser" type="button" class="action-button delete-button">Delete</button>
          </td>

          <FormModal v-if="isModalVisible" @closeModal="unselectUser" />
      </tr>
</template>

<script>
import FormModal from "../components/FormModal.vue"

export default {
    name: "UserSearchResult",

    props: ["user"],

    components: {FormModal},

    methods: {
        async deleteUser(){
            const userId = this.user.id;
            const el = this;

            const updatedUserSearchResult = []

            await this.axios.delete(`${userId}`)
            .then((response) => {
                if(response.request.status === 200) {
                    el.userSearchResult.forEach(user => {
                        if(user.id !== userId){
                            updatedUserSearchResult.push(user)
                        }
                    })
                    
                    console.log(updatedUserSearchResult);

                    console.log("Successfully deleted user!")

                    this.$store.commit("updateUserSearchResult", updatedUserSearchResult);
                }
            })
            .catch(error => {
                console.log(error);
            })

        },

        selectUser(){
            this.$store.commit('selectUser', this.user)
        },

        unselectUser(){
            this.$store.commit('unselectUser');
        },

        formattedDate(date){
            const year = date.split("-")[0];
            const month = date.split("-")[1];
            const day = date.split("-")[2].split("T")[0];

            return `${day}/${month}/${year}`;
        }
    },

    computed: {
        userSearchResult(){
            return this.$store.getters.getUserSearchResult
        },

        isModalVisible(){
            return this.$store.getters.isUserSelected(this.user)
        },
    }
}
</script>

<style lang="scss" scoped>
.action-button {
    width: 100%;
    color: #f1f1f1;
    border: none;
    padding: .2rem;
    text-transform: uppercase;
}

.edit-button {
    background-color: #1580f6;
}

.delete-button {
    background-color: #f93030;
}
</style>