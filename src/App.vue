<script setup lang="ts">
import { onMounted } from "vue";
import { useGenerator } from "@/composables/generator";

const { generate, output } = useGenerator("basic");

onMounted(async () => {
    await generate(1000);
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
    }
</style>
