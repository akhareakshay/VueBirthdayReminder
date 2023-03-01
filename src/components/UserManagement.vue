<template>
  <div class="container">
    <h1 class="text-center">Users List</h1>
    <table class="table table-stripped">
      <thead>
        <tr>
          <th>User Id</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.userid }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserManagementService from "../services/UserManagementService";
import axios from 'axios';
// import { defineComponent } from "@vue/composition-api";

// export default defineComponent({

//   setup() {},
// });

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers() {
      axios
        .get(UserManagementService.backend_path + "user/list")
        .then((res)=>{
          this.users = res.data
          console.log(res.data)
        })
    }
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style>
</style>