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
.card-body {
    padding: 3rem 2rem 2rem;
}
.bold-username {
    font-weight: 700;
    color: black
}
.card-description {
    height: 45px;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
    border-radius: 9px;
    background: white;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem;
}
.rating-container {
    display: flex;
    justify-content: flex-end;
    height: 35px;
    margin: 1rem 0 0;
}
.rating {
    background-color: white;
    border-radius: 9px;
    overflow: hidden;
    height: 35px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
}
.star {
    background: #FECF58;
    border-radius: 9px;
    color: white;
    height: 35px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 17px;
}
.number-of-stars {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
.contributors-container h3 {
    font-weight: 600;
    font-size: 17px;
    margin-bottom: 1rem;
}
.contributors {
    background-color: white;
    border-radius: 9px;
    display: flex;
    flex-wrap: wrap;
}
.single-contributor {
    width: 50%;
    box-sizing: border-box;
    display: flex;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #EEEEEE;
}
.single-contributor:nth-child(odd) {
    border-right: 1px solid #EEEEEE;
} 
.contributor-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
.contributor-username {
    font-weight: 600;
    font-size: 16px;
}
.commit-number {
    font-size: 13px;
    font-weight: 400;
}
</style>