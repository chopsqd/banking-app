<template>
    <navbar/>
    <sidebar/>

    <div class="container with-nav">
        <app-message/>
        <router-view/>
    </div>
</template>

<script>
import Navbar from "../components/global/Navbar.vue";
import AppMessage from "@/components/ui/AppMessage.vue";
import Sidebar from "@/components/global/Sidebar.vue";

export default {
  name: "MainLayout",
  components: {
      Sidebar,
    AppMessage,
    Navbar
  }
}
</script>
