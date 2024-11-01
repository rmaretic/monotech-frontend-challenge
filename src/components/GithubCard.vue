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

        <!-- Card body -->
        <div class="card-body">
            <div class="card-description">
                <strong class="bold-username">
                    {{ currentCard.name }}
                </strong>
                <template v-if="currentCard.description">
                    &nbsp;• 
                    {{ currentCard.description }}
                </template>
            </div>

            <!-- Rating container -->
            <div class="rating-container">
                <div class="rating">
                    <div class="star" @click="toggleStar">
                        <FilledStarIcon v-if="currentCard.isStared"/>
                        <EmptyStarIcon v-else/>
                        Star
                    </div>
                    <div class="number-of-stars">
                        {{ currentCard.stars }}
                    </div>
                </div>
            </div>

            <!-- Contributors -->
            <div class="contributors-container">
                <h3>
                    Top contributors:
                </h3>
                <div class="contributors">
                    <div class="single-contributor" v-for="(contributor, i) in currentCard.contributors">
                        <img :src="contributor.avatarUrl" class="contributor-avatar">
                        <div class="contributor-information">
                            <div class="contributor-username">
                                {{ contributor.login }}
                            </div>
                            <div class="commit-number">
                                {{ contributor.contributions }} commits
                            </div>
                        </div>
                    </div>
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
.header-container {
    height: 76px;
    position: relative;
}
.header {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 30px;
    position: absolute;
    bottom: -20px;
}
.card {
    padding: 0;
    overflow: hidden;
}
.avatar {
    height: 77px;
    width: 77px;
    border-radius: 10px;
}
.username {
    background: white;
    height: 40px;
    width: fit-content;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border-radius: 9px;
    font-size: 17px;
    font-weight: 600;
}
.icon {
    background: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
}
</style>