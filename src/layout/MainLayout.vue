<template>
    <navbar/>
    <div class="container with-nav">
        <app-message/>
        <router-view/>
    </div>
</template>

<script>
import Navbar from "../components/global/Navbar.vue";
import AppMessage from "@/components/ui/AppMessage.vue";

export default {
  name: "MainLayout",
  components: {
    AppMessage,
    Navbar
  }
}
</script>
