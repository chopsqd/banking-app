<template>
    <table
        class="table"
        v-if="requests.length"
    >
        <thead>
        <tr>
            <th>#</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(request, index) in request"
            :key="request.id"
        >
            <td>{{ index + 1 }}</td>
            <td>{{ request.fio }}</td>
            <td>{{ request.phone }}</td>
            <td>{{ currency(request.amount) }}</td>
            <td>
                <app-status :type="request.status"/>
            </td>
            <td>
                <router-link
                  v-slot="{navigate}"
                  custom
                  :to="{
                    name: 'Request',
                    params: {
                        id: request.id
                    }
                  }"
                >
                    <button
                      class="btn"
                      @click="navigate"
                    >
                        Открыть
                    </button>
                </router-link>
            </td>
        </tr>
        </tbody>
    </table>

    <h4
        v-else
        class="text-center"
    >
        Заявок пока нет
    </h4>
</template>

<script>
import {currency} from "@/utils/currency.util";
import AppStatus from "@/components/ui/AppStatus.vue";

export default {
    components: {AppStatus},
  props: ['requests'],
    setup() {
      return {currency}
    }
}
</script>