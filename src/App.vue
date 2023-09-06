<script setup lang="ts">
import { onMounted } from "vue"
import { useGenerator } from "@/composables/generator"
import axios from "axios"

async function getRandomCatImage() {
    const result = await axios.get('https://api.thecatapi.com/v1/images/search')
    if (result?.data) {
        return result.data[0].url
    }
}

const { generate, output } = useGenerator("basic", getRandomCatImage)

onMounted(async () => {
    await generate(0)
})

</script>

<template>
    <h1>Meow</h1>
    <div class="text-body" v-html="output">
    </div>
</template>

<style scoped>
    .text-body {
        width: 100%;
        text-align: left;
        text-indent: 4rem;
        padding-bottom: calc(min(50%, 200px));
    }
</style>
