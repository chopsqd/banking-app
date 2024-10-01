<template>
    <form @submit.prevent="onSubmit">
        <div :class="['form-control', {invalid: fError}]">
            <label for="fio">ФИО</label>
            <input type="text" id="fio" v-model="fio" @blur="fBlur" />
            <small v-if="fError">{{fError}}</small>
        </div>

        <div :class="['form-control', {invalid: pError}]">
            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model="phone" @blur="pBlur" />
            <small v-if="pError">{{pError}}</small>
        </div>

        <div :class="['form-control', {invalid: aError}]">
            <label for="amount">Сумма</label>
            <input type="number" id="amount" v-model.number="amount" @blur="aBlur" />
            <small v-if="aError">{{aError}}</small>
        </div>

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
          class="btn primary"
          type="submit"
          :disabled="isSubmitting"
        >
            Создать
        </button>
    </form>
</template>

<script>
import {useRequestForm} from "@/use/request-form";

export default {
    emits: ['created'],
    setup(_, {emit}) {
        const handleSubmit = async (values) => {
            emit('created')
        }

        return {...useRequestForm(handleSubmit)}
    }
}
</script>