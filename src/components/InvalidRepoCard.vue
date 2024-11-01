<template>
    <div class="card invalid-repo">
        This is not a valid Github repository. Please provide valid username and repository name.
        <button @click="openHomepage" class="back-button">Back</button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const openHomepage = () => {
    router.push('/')
}
</script>
<style>
.invalid-repo {
    padding: 2rem !important;
}
.back-button {
    height: 40px;
    padding: 0 1rem;
    border-radius: 9px;
    border: none;
    background: rgb(40,203,164);
    color: white;
    font-size: 17px;
    font-weight: 600;
}
</style>