<template>
    <app-loader v-if="isLoading"/>
    <app-page back title="Заявка" v-else-if="request">
        <p><b>ФИО владельца: </b>{{request.fio}}</p>
        <p><b>Телефон: </b>{{request.phone}}</p>
        <p><b>Сумма: </b>{{currency(request.amount)}}</p>
        <p><b>Статус: </b> <app-status :type="request.status"/></p>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button
          class="btn danger"
          @click="remove"
        >
            Удалить
        </button>
        <button
          v-if="hasChanges"
          class="btn"
          @click="update"
        >
            Обновить
        </button>
    </app-page>
    <h3
      v-else
      class="text-center text-white"
    >
        Заявки с ID = {{$route.params.id}} нет
    </h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import {currency} from "@/utils/currency.util";

export default {
    components: {AppStatus, AppLoader, AppPage},
    setup() {
        const isLoading = ref(true)
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const request = ref({})
        const status = ref()

        onMounted(async () => {
            isLoading.value = true
            request.value = await store.dispatch('request/loadById', route.params.id)
            status.value = request.value?.status
            isLoading.value = false
        })

        const hasChanges = computed(() => {
            return request.value.status !== status.value
        })

        const remove = async () => {
            await store.dispatch('request/remove', route.params.id)
            router.push('/')
        }

        const update = async () => {
            const payload = {
                ...request.value,
                status: status.value,
                id: route.params.id
            }
            await store.dispatch('request/update', payload)
            request.value.status = status.value
        }

        return {
            isLoading, request, status, hasChanges,
            currency, remove, update
        }
    }
}
</script>