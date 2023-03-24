<template>
  <div
    class="d-flex"
    style="height: 100vh; gap: 10px; background: var(--lightBg);padding-right: 10px;"
  >
    <div
      style="width: 15%; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      class="pt-5 bg-white"
    >
      <div class="w-100 d-flex flex-column" style="font-size: 1.1rem; gap: 10px">
        <router-link
          to="/home"
          class="px-5 w-100"
          style="color: var(--themeColor)"
          >List</router-link
        >
        <router-link
          to="/create"
          class="px-5 w-100"
          style="color: var(--themeColor)"
          >Create</router-link
        >
        <router-link
          to="/template"
          class="px-5 w-100"
          style="color: var(--themeColor)"
          >Templates</router-link
        >
      </div>
    </div>
    <div style="width: 85%" class="pt-2">
      <div style="position: relative; height: 40px" class="text-right">
        <button class="border-0 bg-transparent" type="button" @click="()=> showpopup = !showpopup">
          <h4 class="px-4" style="color: var(--themeColor)">
            <i class="mr-2 fa fa-user" aria-hidden="true"></i>
            {{ this.$store.state.username }}
          </h4>
        </button>
        <div v-if="showpopup" class="p-3 bg-white text-center" 
          style="width:15%;position: absolute; z-index: 9; right: 10px; top: 40px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
          <button 
            @click="logout"
            class="border-0 bg-transparent" style="color: var(--themeColor)">
            Logout
          </button>
        </div>
      </div>
      <router-view></router-view>
      
      <!-- <h1>welcome {{ this.$store.state.userid }}</h1> -->
      <!-- <h3><i class="fa fa-user user-icon" aria-hidden="true"></i></h3> -->
      <!-- <table>
      <thead>
        <tr>
          <th class="">Name</th>
          <th>Contact</th>
          <th>DOB</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) of users" v-bind:key="index">
          <td>{{ user.name }}</td>
          <td>
            <p>{{ user.contact.contactNumber }}</p>
            <p>{{ user.contact.emailId }}</p>
          </td>
          <td>{{ user.date }}</td>
          <td>{{ user.gender }}</td>
        </tr>
      </tbody>
    </table> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserManagementService from "@/services/UserManagementService";
export default {
  data() {
    return {
      users: [],
      showpopup: false,
    };
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
    logout(){
      localStorage.clear();
      this.$router.push('/')
    }
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style>
i.user-icon {
  font-size: 50px;
}
</style>