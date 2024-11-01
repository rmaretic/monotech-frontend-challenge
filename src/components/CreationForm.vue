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
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const username = ref('');
const repo = ref('');
const color = ref("rgb(40,203,164)");
</script>
<style>

</style>