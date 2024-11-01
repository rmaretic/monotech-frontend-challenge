<template>
    <GithubCard/>
</template>
<script setup lang="ts">
import GithubCard from '@/components/GithubCard.vue';
import { useApiStore } from '@/store/api';
import { useRoute } from 'vue-router';

const route = useRoute();

const apiStore = useApiStore();
apiStore.getCard(route.params.id)
</script>