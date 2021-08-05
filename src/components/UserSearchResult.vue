<template>
  <div>
      {{ user.name }}

      <button @click="selectUser" type="button">Edit</button>
      <button @click="deleteUser" type="button">Delete</button>

      <FormModal v-if="isModalVisible" @closeModal="unselectUser" />
  </div>
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

<style>

</style>