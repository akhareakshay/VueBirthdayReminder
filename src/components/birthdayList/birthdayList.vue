<template>
  <div>
    <div v-if="showList"
      class="d-flex w-100 mt-4 flex-wrap"
      style="
        height: calc(100vh - 100px);
        overflow: auto;
        align-content: flex-start;
      "
    >
      <div
        class="border-0"
        style="width: 25%; border-radius: 5px; background: none"
        v-for="(user, index) of users"
        v-bind:key="index"
      >
        <!-- <img class="card-img-top" src="img_avatar1.png" alt="Card image" style="width:100%"> -->
        <div
          class="bg-white"
          style="
            margin: 10px;
            padding: 20px;
            border-radius: 5px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          "
        >
        <div class="d-flex justify-content-end" style="gap: 2px;">
          <button class="border-0 bg-transparent" @click="editBirthDay(user.birthdayId)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="border-0 bg-transparent" @click="deleteBirthday(user.birthdayId,index)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
          <h5 class="card-title" style="color: var(--themeColor)">
            {{ user.name }}
          </h5>
          <p class="text-secondary" style="margin-top: -10px">
            {{ user.gender }}
          </p>
          <p class="">
            <i class="fa fa-birthday-cake mr-2" aria-hidden="true"></i>
            {{ user.date }}
          </p>
          <p class="">
            <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
            {{ user.contact.emailId }}
          </p>
          <p class="">
            <i
              class="fa fa-map-marker ml-1 mr-2"
              style="font-size: 20px"
              aria-hidden="true"
            ></i>
            {{ user.address.city }}, {{ user.address.state }},
            {{ user.address.pincode }}
          </p>
          <p class="d-flex align-items-center">
            <i
              class="fa fa-mobile ml-1 mr-3"
              style="font-size: 25px"
              aria-hidden="true"
            ></i>
            {{ user.contact.contactNumber }}
          </p>
          <!-- <a href="#" class="btn btn-primary">See Profile</a> -->
        </div>
      </div>
    </div>
    <CreateBirthday :fromList="true" :fromListBD_Id="edit_birthdayId" @backtolist="backtolist" v-if="!showList"/>
  </div>
</template>

<script>
import axios from 'axios'
import UserManagementService from "../../services/UserManagementService"
import CreateBirthday from '../CreateBirthdays/CreateBirthday.vue';
export default {
  data() {
    return {
      users:[],
      showpopup: false,
      showList: true,
      edit_birthdayId: null,
    };
  },
  components:{
    CreateBirthday 
  },
  methods: {
    getAllUsers() {
      this.$store.commit("getUsername", {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        userid: JSON.parse(localStorage.getItem("userDetails")).userid,
      });

      axios
        .get(
          UserManagementService.backend_path +
            "birthday/getbyid/" +
            this.$store.state.userid
        )
        .then((response) => {
          console.log(response.data);
          this.users = response.data;
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    editBirthDay(Id){
      this.edit_birthdayId = Id
      this.showList = false;
    },
    async saveEditedBirthDay(id){
      try{
        let body = {

          birthdayId: id
        }
        let res = await axios.post(UserManagementService.backend_path + "birthday/saveorupdate",body)
        console.log(res.data);
        if(res.status == 200){
          this.getAllUsers()
        }
      }
      catch(err){
        console.log(err)
      }
    },
    async deleteBirthday(id,index){
      try{
        let res = await axios.post(UserManagementService.backend_path + "birthday/delete",{userId: this.$store.state.userid, birthdayId: id})
        console.log(res.data);
        if(res.status == 200){
          this.users.splice(index,1);
        }
      }
      catch(err){
        console.log(err)
      }
    },
    backtolist(){
      this.showList = true;
    }
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
button{
  cursor: pointer;
}
</style>