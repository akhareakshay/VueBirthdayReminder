<template>
  <div class="container">
    <h3 class="text-center mb-4">Register User</h3>

    <div class="w-75 mx-auto">
      <form class="w-50 mx-auto" v-on:submit.prevent="signUp()">
        <input
          type="text"
          class="form-control mb-3 border border-primary"
          v-model="username"
          placeholder="UserName"
          required
        />
        <input
          type="number"
          required
          v-model="phonenumber"
          placeholder="Phone Number"
          maxlength="10"
          minlength="10"
          class="form-control mb-3 border border-primary"
        />
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="form-control mb-3 border border-primary"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Create Password"
          class="form-control mb-3 border border-primary"
          required
        />

        <button type="submit" class="btn btn-outline-primary">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserManagementService from "../services/UserManagementService";
import axios from "axios";
// import { defineComponent } from "@vue/composition-api";

// export default defineComponent({

//   setup() {},
// });

export default {
  data() {
    return {
      users: [],
      username: "",
      phonenumber: "",
      email: "",
      password: "",
    };
  },
  methods: {
    getAllUsers() {
      axios
        .get(UserManagementService.backend_path + "user/list")
        .then((res) => {
          this.users = res.data;
          console.log(res.data);
        });
    },
    signUp() {
      let body = {
        userName: this.username,
        password: this.password,
        phoneNumber: this.phonenumber.toString(),
        email: this.email,
      };
      axios
        .post(UserManagementService.backend_path + "user/saveorupdate", body)
        .then((response) => {
          alert("REcord created Successfull !");
          console.log(response.data);
          this.username = ""
          this.password=""
          this.phonenumber = ""
          this.email = ""
        });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style>
</style>