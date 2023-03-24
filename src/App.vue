<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

// import Users from "./components/UserManagement.vue";
// import LoginPage from "./components/Login/LoginPage.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // Users,
    // LoginPage,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Alexandria');
#app {
  font-family: 'Alexandria';
}

button:is(:active,:focus),
a:is(:active,:focus){
  outline: none !important;
  border: 0 !important;
}
input:is(:active,:focus),
textarea:is(:active,:focus),
select:is(:active,:focus){
  background: #e8e8e8 !important;
}
:root{
  --themeColor: #536dfe;
  --themeBackgroundColor: #536dfe;
  --lightBg: rgb(83 109 254 / 12%);
}
</style>
