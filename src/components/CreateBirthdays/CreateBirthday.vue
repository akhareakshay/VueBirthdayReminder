<template>
  <div>
    <div class="mt-4 bg-white mx-auto p-3 pt-4" style="width: 98%">
      <div class="d-flex justify-content-between">
      <h3
        class="text-left mb-4"
        style="font-size: 1.5rem; color: var(--themeColor)"
      >
        {{ editBd ? "Edit Birthday" : "Create Birthday" }}
      </h3>
       <button type="button" class="btn px-3" style="font-size: 1rem !important;" @click="$emit('backtolist')">Back To Birthday List</button>
      </div>
      <div class="w-75 mx-auto mt-3">
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
  emits: ['backtolist'],
  props:{
      fromList:{
        type: Boolean,
        default: false,
      },
      fromListBD_Id:{
        type: Number,
        default: null
      }
    },
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
      editBd: this.fromList,
      idFromList: this.fromListBD_Id
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
      if(this.editBd){
        body = {...body,birthdayId: this.idFromList}
      }
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
  mounted(){
    if(this.editBd){
       axios
        .get(`${UserManagementService.backend_path}birthday/getbirthday/${this.$store.state.userid}/${this.idFromList}`)
        .then((res)=>{
          let data = res.data;
          if(res.status == 200){
            this.gender = data[0].gender
            this.name = data[0].name
            this.relation = data[0].relation
            this.date = data[0].date
            this.phonenumber = data[0].contact.contactNumber
            this.email = data[0].contact.emailId
            this.city = data[0].address.city
            this.taluka = data[0].address.taluka
            this.district = data[0].address.district
            this.state = data[0].address.state
            this.pincode = data[0].address.pincode
            this.country = data[0].address.country
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
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