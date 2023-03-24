<template>
<div>
  <div class="mt-4 bg-white mx-auto p-3 pt-4" style="width: 98%">
    <h2
      class="text-left mb-4"
      style="font-size: 1.5rem; color: var(--themeColor)"
    >Welcome to template</h2>

    <div class="w-75 mx-auto">
      <form class="w-50 mx-auto" v-on:submit.prevent="createTemplates()">
        <input
          type="text"
          class="form-control mb-3 border border-primary"
          v-model="subject"
          placeholder="Subject"
          required
        />
        <textarea
          class="form-control mb-3 border border-primary"
          v-model="body"
          placeholder="Message"
          required
        ></textarea>
        <button type="submit" class="btn">Save</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import UserManagementService from "@/services/UserManagementService";
export default {
  data() {
    return {
      subject: "",
      body: "",
    };
  },
  methods: {
    createTemplates() {
      var body = {
        subject: this.subject,
        message: this.body,
        userId: this.$store.state.userid,
      };
      axios
        .post(
          UserManagementService.backend_path + "emailtemplate/saveorupdateforuser",
          body
        )
        .then((response) => {
          console.log(response.data);
          // this.subject = "";
          // this.body = "";
        });
    },
    fillTemplate() {
      axios
        .get(
          UserManagementService.backend_path +
            "emailtemplate/getbyid/" +
            this.$store.state.userid
        )
        .then((response) => {
          console.log(response.data);
          this.subject = response.data[0].subject;
          this.body = response.data[0].message;

        });
    },
  },
  mounted(){
    this.fillTemplate();
  }
};
</script>

<style scoped>
input {
  border: 0px !important;
  height: 40px;
  border-radius: 5px;
  background: #e8e8e8;
  font-size: 1rem;
}
textarea{
  border: 0px !important;
  border-radius: 5px;
  background: #e8e8e8;
  font-size: 1rem;
}
button {
  height: 40px;
  color: #fff;
  border-radius: 5px !important;
  background: var(--themeBackgroundColor);
  font-size: 1.1rem !important;
  cursor: pointer;
}
</style>