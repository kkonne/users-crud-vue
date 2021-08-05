<template>
  <div class="modal-backdrop">
      <div class="modal">
            <h1>Edit user</h1>

            <label for="user-name">User name</label>
            <input v-model="userName" type="text" name="user-name">

            <br>
            
            <label for="user-avatar">User avatar link</label>
            <input v-model="userAvatar" type="text" name="user-avatar">

            <br>
            
            <label for="user-email">User email</label>
            <input v-model="userEmail" type="text" name="user-email">

            <br>

            <button @click="closeModal" type="button" class="action-button cancel-button">Cancel</button>
            <button @click="editUser" type="button" class="action-button submit-button">Submit</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "FormModal",

    data(){
        return {
            userName: "",
            userAvatar: "",
            userEmail: "",
        }
    },

    methods: {
        closeModal(){
            this.$emit("closeModal")
        },

        async editUser(){
            const userId = this.user.id;
            const el = this;

            const nameInput = this.userName;
            const avatarInput = this.userAvatar;
            const emailInput = this.userEmail;

            if(!nameInput || !avatarInput || !emailInput){ // basic validation
                console.log("Error! Invalid input!");
                return;
            }

            // we could add if avatar starts with "http" or validate mail via regex
            // but I'm gonna leave this basic basic validation of data

            const updatedUserSearchResult = []

            await this.axios.put(`${userId}`, {
                "createdAt": this.user.createdAt,
                "name": nameInput,
                "avatar": avatarInput,
                "email": emailInput,
                "id": this.user.id
            })
            .then((response) => {
                if(response.request.status === 200) {

                    el.userSearchResult.forEach(user => {
                        if(user.id === userId){
                            user.name = nameInput;
                            user.email = emailInput;
                            user.avatar = avatarInput;
                        }

                        updatedUserSearchResult.push(user)
                    })

                    console.log("Successfully edited user!")

                    el.$store.commit("updateUserSearchResult", updatedUserSearchResult);
                }
            })
            .catch(error => {
                console.log(error);
            });

            this.closeModal();
        }
    },

    created(){
        this.userName = this.user.name;
        this.userAvatar = this.user.avatar;
        this.userEmail = this.user.email;
    },

    computed: {
        user(){
            return this.$store.getters.getSelectedUser;
        },

        userSearchResult(){
            return this.$store.getters.getUserSearchResult;
        },
    }
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    min-width: 300px;
    padding: 2rem;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.action-button {
    width: 100%;
    color: #f1f1f1;
    border: none;
    padding: .4rem .2rem;
    text-transform: uppercase;
    margin: 5px 0;
}

.cancel-button {
    background-color: #f93030;
}

.submit-button {
    background-color: #009010;
}
</style>