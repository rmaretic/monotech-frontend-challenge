import { defineStore } from "pinia";
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { Octokit } from 'octokit'

export const useApiStore = defineStore('api', () => {

    const link = ref(null)
    const currentCard = ref(null);
    const isLoading = ref(false)
    
    const saveCard = (payload) => {
        // I used local storage as a mock API
        let cards = JSON.parse(localStorage.getItem('githubCards'))
        if (!cards) {
            cards = []
        }
        const uuid = uuidv4();
        payload.uuid = uuid;
        cards.push(payload);
        localStorage.setItem('githubCards', JSON.stringify(cards));
        link.value = `${window.location.origin}/${uuid}`;
    }

    return {
        currentCard,
        link,
        isLoading,
        saveCard,
    }
})