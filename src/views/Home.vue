<template>
    <app-loader v-if="isLoading"/>

    <app-page
      v-else
      title="Список заявок"
    >
        <template #header>
            <button
              class="btn primary"
              @click="isModalOpen = true"
            >
                Создать
            </button>
        </template>

        <request-filter v-model="filter"/>
        <request-table :requests="requests"/>

        <teleport to="body">
            <app-modal
              v-if="isModalOpen"
              title="Создать заявку"
              @close="isModalOpen = false"
            >
                <request-modal @created="isModalOpen = false"/>
            </app-modal>
        </teleport>
    </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import RequestTable from "@/components/request/RequestTable.vue";
import {computed, onMounted, ref} from "vue";
import AppModal from "@/components/ui/AppModal.vue";
import RequestModal from "@/components/request/RequestModal.vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import RequestFilter from "@/components/request/RequestFilter.vue";

export default {
    name: 'Home',
    components: {RequestFilter, AppLoader, RequestModal, AppModal, RequestTable, AppPage},
    setup() {
        const store = useStore()
        const isModalOpen = ref(false)
        const isLoading = ref(false)
        const filter = ref({})

        onMounted(async () => {
            isLoading.value = true
            await store.dispatch('request/loadData')
            isLoading.value = false
        })

        const requests = computed(() => {
            return store.getters["request/requests"]
              .filter(request => {
                  const matchesName = !filter.value.name || request.fio.includes(filter.value.name);
                  const matchesStatus = !filter.value.status || request.status === filter.value.status;

                  return matchesName && matchesStatus;
              })
        })

        return {isModalOpen, requests, isLoading, filter}
    }
}
</script>
