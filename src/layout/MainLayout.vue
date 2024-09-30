<template>
  <Navbar/>
  <div class="container with-nav">
    <router-view/>
  </div>
</template>

<script>
import Navbar from "../components/global/Navbar.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>

</style>
