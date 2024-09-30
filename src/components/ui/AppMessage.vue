<template>
    <div v-if="message" :class="['alert', message.type]">
        <p v-if="title" class="alert-title">{{ title }}</p>
        <p>{{ message.text }}</p>
        <span @click="close" class="alert-close">&times;</span>
    </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'AppMessage',
  setup() {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }

    const message = computed(() => store.state.error.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    return {
      message,
      title,
      close: () => store.commit('error/clearMessage')
    }
  }
}
</script>