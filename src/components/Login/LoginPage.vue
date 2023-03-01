<template>
  <div>
    <h1>HEy Sampi</h1>
    <form>
      UserName <input type="text" v-model="username" /><br /><br />
      Password <input type="password" v-model="password" />
      <button type="submit" @click.prevent="login()">Login</button>
      <router-link class="links" to="/Signup">Signup</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import UserManagementService from "@/services/UserManagementService";

export default {
  data() {
    return {
      usersdata: [],
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .get(UserManagementService.backend_path + "user/list")
        .then((response) => {
          this.usersdata = response.data;
          console.log(this.usersdata);
          for (let user of this.usersdata) {
            let dbpassword = user.password;
            let dbusername = user.userName;
            if (dbpassword == this.password && dbusername == this.username) {
              this.$router.push("/home");
            }
          }
        });
    },
  },
};
</script>

<style>
.links {
  background: cyan;
  color: white;
  text-decoration: none;
}
</style>