<template>
    <div>
        <h1>Github Cards</h1>
        <h3>Make shareable github cards</h3>

        <!-- Card -->
        <div class="card">
          <div class="text-container">
            <input type="text" placeholder="Github Username" class="text-input" v-model="username">
            <span class="text-divider">/</span>
            <input type="text" placeholder="Repo" class="text-input" v-model="repo">
          </div>
          <div class="flex space-between align-center">
            <span class="section-title">Select template color:</span>
            <div class="flex">
                <color-picker v-model:pureColor="color"/>
                <div class="color-text">
                    {{ color }}
                </div>
            </div>
          </div>

          <!-- Icons -->
          <div class="icons-section">
            <span class="section-title">Select Icon:</span>
            <div class="icon-selector-container">
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleMan12'}"
                  @click="setIcon('PeopleMan12')">
                  <PeopleMan12 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleManCap2'}"
                  @click="setIcon('PeopleManCap2')">
                  <PeopleManCap2 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleManBeard2'}"
                  @click="setIcon('PeopleManBeard2')">
                  <PeopleManBeard2 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'ProfessionsManChef3'}"
                  @click="setIcon('ProfessionsManChef3')">
                  <ProfessionsManChef3 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'ProfessionsManDoctor1'}"
                  @click="setIcon('ProfessionsManDoctor1')">
                  <ProfessionsManDoctor1 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'ProfessionsManMagician'}"
                  @click="setIcon('ProfessionsManMagician')">
                  <ProfessionsManMagician />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'FamousPeopleManMerlin2'}"
                  @click="setIcon('FamousPeopleManMerlin2')">
                  <FamousPeopleManMerlin2 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'ReligionManChristian1'}"
                  @click="setIcon('ReligionManChristian1')">
                  <ReligionManChristian1 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'CrimeManThief1'}"
                  @click="setIcon('CrimeManThief1')">
                  <CrimeManThief1 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWoman1'}"
                  @click="setIcon('PeopleWoman1')">
                  <PeopleWoman1 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWoman4'}"
                  @click="setIcon('PeopleWoman4')">
                  <PeopleWoman4 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWoman13'}"
                  @click="setIcon('PeopleWoman13')">
                  <PeopleWoman13 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'OldPeopleWoman1'}"
                  @click="setIcon('OldPeopleWoman1')">
                  <OldPeopleWoman1 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWomanGlasses5'}"
                  @click="setIcon('PeopleWomanGlasses5')">
                  <PeopleWomanGlasses5 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWomanGlasses6'}"
                  @click="setIcon('PeopleWomanGlasses6')">
                  <PeopleWomanGlasses6 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'ReligionWomanMuslim'}"
                  @click="setIcon('ReligionWomanMuslim')">
                  <ReligionWomanMuslim />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'PeopleWoman8'}"
                  @click="setIcon('PeopleWoman8')">
                  <PeopleWoman8 />
                </button>
                <button
                  class="icon-button"
                  :class="{'is-selected': icon === 'CrimeWomanThief'}"
                  @click="setIcon('CrimeWomanThief')">
                  <CrimeWomanThief />
                </button>
            </div>
          </div>
        </div>

        <!-- Bottom section -->
        <div class="buttons-container">
          <template v-if="link">
            <button @click="shareTwitter" class="twitter-button">
              <TwitterIcon />
              Tweet Your Link
            </button>
            <button @click="reset" class="reset-button">
              <LinkIcon />
              Reset form
            </button>
            <button class="generate-link-button" @click="openLink">
              <OpenLinkIcon />
              Open
            </button>
          </template>

          <template v-else>
            <div class="error">
              {{ error }}
            </div>
            <button class="generate-link-button" @click="submit">
              <LinkIcon />
              Generate Link
            </button>
          </template>
        </div>
        <div v-if="link" class="link-container">
          {{ link }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

/* Icons */
import CrimeManThief1 from '@/components/icons/CrimeManThief1.vue';
import CrimeWomanThief from '@/components/icons/CrimeWomanThief.vue';
import FamousPeopleManMerlin2 from '@/components/icons/FamousPeopleManMerlin2.vue';
import OldPeopleWoman1 from '@/components/icons/OldPeopleWoman1.vue';
import PeopleMan12 from '@/components/icons/PeopleMan12.vue';
import PeopleManBeard2 from '@/components/icons/PeopleManBeard2.vue';
import PeopleManCap2 from '@/components/icons/PeopleManCap2.vue';
import PeopleWoman1 from '@/components/icons/PeopleWoman1.vue';
import PeopleWoman4 from '@/components/icons/PeopleWoman4.vue';
import PeopleWoman13 from '@/components/icons/PeopleWoman13.vue';
import PeopleWomanGlasses5 from '@/components/icons/PeopleWomanGlasses5.vue';
import PeopleWomanGlasses6 from '@/components/icons/PeopleWomanGlasses6.vue';
import ProfessionsManChef3 from '@/components/icons/ProfessionsManChef3.vue';
import ProfessionsManDoctor1 from '@/components/icons/ProfessionsManDoctor1.vue';
import ProfessionsManMagician from '@/components/icons/ProfessionsManMagician.vue';
import ReligionManChristian1 from '@/components/icons/ReligionManChristian1.vue';
import PeopleWoman8 from '@/components/icons/PeopleWoman8.vue';
import ReligionWomanMuslim from '@/components/icons/ReligionWomanMuslim.vue';
import LinkIcon from './icons/LinkIcon.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
import OpenLinkIcon from './icons/OpenLinkIcon.vue';

const username = ref('');
const repo = ref('');
const color = ref("rgb(40,203,164)");
const icon = ref<string|null>(null);

const error = ref<string|null>(null);

const setIcon = (selection: string) => {
  icon.value = selection;
}

const shareTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${link.value}`;
  window.open(url, "_blank")
}

const openLink = () => {
  const url = `${link.value}`;
  window.open(url, "_blank")
}

const reset = () => {
  link.value = null;
  username.value = '';
  repo.value = '';
  color.value = "rgb(40,203,164)";
  icon.value = null;
  error.value = null;
}

const link = ref('')

const isFormValid = computed(() =>{
  return username.value && repo.value && icon.value
})

const submit = () => {
  if (!isFormValid.value) {
    error.value = 'Please fill in all fields before submitting';
    return;
  }
}
</script>
<style>
h1 {
    font-weight: 600;
}
.card {
  border: 1px solid #E6E6E6;
  background: #F9F9F9;
  padding: 2rem;
  border-radius: 9px;
  width: 515px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.text-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}
.section-title {
    font-size: 18px;
}
.vc-color-wrap {
    width: 96px !important;
    height: 40px !important;
    margin: 0 !important;
    border-radius: 9px 0 0 9px;
}
.current-color {
    width: 96px !important;
    height: 40px !important;
    border-radius: 9px 0 0 9px;
}
.text-input {
  border: none;
  height: 40px;
  border-radius: 9px;
  background: white;
  box-sizing: border-box;
  padding: 1rem;
  width: 43%;
  box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
  font-size: 15px;
  font-weight: 500;
}
.color-text {
    background-color: white;
    width: 140px;
    height: 40px;
    border-radius: 0 9px 9px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
}

::placeholder {
  color: #C4C4C4;
}

.text-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: white;
  box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.1);
}

.icon-selector-container {
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
  flex-wrap: wrap;
}
.icons-section {
    margin-top: 1rem;
}
.icon-button {
  border: 1px solid #E6E6E6;
  background: #F9F9F9;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  cursor: pointer;
}
.icon-button:hover, .icon-button.is-selected {
    background: #d5d5d5;
}
.buttons-container {
  display: flex;
  justify-content: space-between;
}
.generate-link-button {
  height: 45px;
  padding: 0 1rem;
  border-radius: 9px;
  background: #D998E3;
  color: white;
  border: 0;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.twitter-button {
  height: 45px;
  padding: 0 1rem;
  border-radius: 9px;
  background: #70CBFF;
  color: white;
  border: 0;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.reset-button {
  height: 45px;
  padding: 0 1rem;
  border-radius: 9px;
  background: #818181;
  color: white;
  border: 0;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.link-container {
  background: #F1F1F1;
  width: 100%;
  height: 45px;
  margin-top: 1rem;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  width: 515px;
  box-sizing: border-box;
  padding: 1rem;
}
.error {
  color: red;
  font-weight: 500;
}
</style>