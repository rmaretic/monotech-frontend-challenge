<template>
    <div class="card" v-if="currentCard">

        <!-- Header -->
        <div class="header-container" :style="`background: ${color}`">
            <div class="header">
                <img
                    :src="currentCard.avatar || '/profile.webp'"
                    alt="avatar"
                    class="avatar">
                <div class="username">
                    @{{ currentCard.name }}
                </div>
                <div class="icon">
                    <IconComponent />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, defineAsyncComponent, watch } from 'vue';
import { useApiStore } from '@/store/api';
import { storeToRefs } from 'pinia';

const apiStore = useApiStore();
const { currentCard, isLoading } = storeToRefs(apiStore);

const color = computed(() => {
    return currentCard.value?.color || "rgb(40,203,164)"
})

let IconComponent = null;
watch(currentCard, (newVal) => {
    if(newVal) {
        IconComponent = defineAsyncComponent(() =>
            import(`./icons/${currentCard.value.icon}.vue`)
        )
    }
})

</script>
<style scoped>

</style>