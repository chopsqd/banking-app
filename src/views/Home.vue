<template>
    <app-page title="Список заявок">
        <template #header>
            <button
              class="btn primary"
              @click="isModalOpen = true"
            >
                Создать
            </button>
        </template>

        <request-table :requests="[]"/>

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
import {ref} from "vue";
import AppModal from "@/components/ui/AppModal.vue";
import RequestModal from "@/components/request/RequestModal.vue";

export default {
    name: 'Home',
    components: {RequestModal, AppModal, RequestTable, AppPage},
    setup() {
        const isModalOpen = ref(false)

        return {isModalOpen}
    }
}
</script>
