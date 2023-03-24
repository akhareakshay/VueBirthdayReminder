<template>
  <div>
    <div class="mt-4 bg-white mx-auto p-3 pt-4" style="width: 98%">
      <h3
        class="text-left mb-4"
        style="font-size: 1.5rem; color: var(--themeColor)"
      >
        Create Birthday
      </h3>
      <div class="w-75 mx-auto">
        <form class="w-full mx-auto" v-on:submit.prevent="createBirthday()">
          <div class="d-flex" style="gap: 10px">
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="name"
              placeholder="Name"
              required
            />
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="relation"
              placeholder="Relation With You"
              required
            />
            <select
              class="form-control mb-3 border border-primary"
              v-model="gender"
              placeholder="Gender"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="d-flex" style="gap: 10px">
            <input
              type="date"
              class="form-control mb-3 border border-primary"
              v-model="date"
              placeholder="Date of Birth"
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
          </div>
          <div class="d-flex" style="gap: 10px">
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="city"
              placeholder="City"
              required
            />
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="taluka"
              placeholder="Taluka"
              required
            />
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="district"
              placeholder="District"
              required
            />
          </div>
          <div class="d-flex" style="gap: 10px">
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="state"
              placeholder="State"
              required
            />
            <input
              type="text"
              class="form-control mb-3 border border-primary"
              v-model="country"
              placeholder="Country"
              required
            />
            <input
              type="number"
              class="form-control mb-3 border border-primary"
              v-model="pincode"
              placeholder="Pincode"
              required
            />
          </div>
          <div class="w-full text-center">
            <button type="submit" class="btn px-3">Save</button>
          </div>
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
      gender: "male",
      name: "",
      relation: "",
      date: "",
      phonenumber: "",
      email: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
      country: "",
    };
  },
  methods: {
    createBirthday() {
      var body = {
        gender: this.gender,
        name: this.name,
        relation: this.relation,
        date: this.date,
        contact: {
          contactNumber: this.phonenumber.toString(),
          emailId: this.email,
        },
        address: {
          city: this.city,
          taluka: this.taluka,
          district: this.district,
          state: this.state,
          pincode: this.pincode.toString(),
          country: this.country,
        },
        userId: this.$store.state.userid,
      };
      axios
        .post(
          UserManagementService.backend_path + "birthday/saveorupdate",
          body
        )
        .then((response) => {
          console.log(response.data);
          if(response.status == 200){
            this.gender = "male";
            this.name = "";
            this.relation = "";
            this.date = "";
            this.phonenumber = "";
            this.email = "";
            this.city = "";
            this.taluka = "";
            this.district = "";
            this.state = "";
            this.pincode = "";
            this.country = "";
          }
        });
    },
  },
};
</script>

<style scoped>
input,
select {
  border: 0px !important;
  height: 40px;
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