<template>
  <component
    v-if="layout"
    :is="`${layout}-layout`"
  />
</template>

<script>
import {useRoute} from "vue-router"
import MainLayout from "./layout/MainLayout.vue";
import AuthLayout from "./layout/AuthLayout.vue";
import {computed} from "vue";

export default {
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    AuthLayout,
    MainLayout
  }
}
</script>
