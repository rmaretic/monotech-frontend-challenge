import { defineStore } from "pinia";
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { Octokit } from 'octokit'

export const useApiStore = defineStore('api', () => {

    const octokit = new Octokit({auth: import.meta.env.GITHUB_KEY})
    
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

    const getCard = async (uuid) => {
      // I mocked API by storing data to localstorage
      const cards = JSON.parse(localStorage.getItem('githubCards'))
      const card = cards.find(c => c.uuid === uuid);

      if (!card) {
          return
      }

      isLoading.value = true;

      await Promise.all([
        fetchStarredStatus(card),
        fetchRepoInformation(card)
      ])
      currentCard.value = card;
      isLoading.value = false;
  }

    const fetchStarredStatus = async (card) => {
      try {
        const starredResponse = await octokit.request('GET /user/starred/{owner}/{repo}', {
            owner: card.username,
            repo: card.repo
        })
        card.isStared = starredResponse.status === 204;
      } catch (e) {
        card.isStared = false;
      }
    }

    const fetchRepoInformation = async (card) => {
      try {
        const [repoResponse, contributorsResponse] = await Promise.all([
          octokit.request('GET /repos/{owner}/{repo}', {
            owner: card.username,
            repo: card.repo
          }),
          octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: card.username,
            repo: card.repo
          }),
        ])

        card.name = repoResponse.data.name 
        card.fullName = repoResponse.data.full_name;
        card.description = repoResponse.data.description;
        card.stars = repoResponse.data.stargazers_count;
        card.forks = repoResponse.data.forks_count;
        card.avatar = repoResponse.data.organization?.avatar_url
        card.contributors = contributorsResponse.data.slice(0, 10).map(c => ({
          login: c.login,
          contributions: c.contributions,
          avatarUrl: c.avatar_url
        }))

      } catch (e) {
        console.error(e);
      }
    }

    const toggleRepoStar = async () => {
      try {
        if (currentCard.value?.isStared) {
          // Unstar the repository
          await octokit.request('DELETE /user/starred/{owner}/{repo}', {
            owner: currentCard.value.username,
            repo: currentCard.value.repo
          })
          currentCard.value.stars--
          currentCard.value.isStared = false;
        } else {
          // Star the repository
          await octokit.request('PUT /user/starred/{owner}/{repo}', {
            owner: currentCard.value.username,
            repo: currentCard.value.repo
          })
          currentCard.value.stars++
          currentCard.value.isStared = true;
        }
      } catch (e) {
        console.error(e);
      }
    }

    return {
        currentCard,
        link,
        isLoading,
        saveCard,
        getCard,
        toggleRepoStar
    }
})