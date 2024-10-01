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
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
export default {
    props: ['requests']
}
</script>