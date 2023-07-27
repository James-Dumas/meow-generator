import { TextGeneratorConfig } from '@/types'
import generatorConfigsJson from '@/data/generators.json'
import { ref, Ref } from 'vue'

const generatorConfigs = generatorConfigsJson as { [key: string]: TextGeneratorConfig }

export function useGenerator(name: string): { generate: (length: number) => Promise<void>, output: Ref<string> } {
    if (name in generatorConfigs) {
        const generatorConfig = generatorConfigs[name]
        const output = ref('')
        async function generate(length: number) {
            let current = generatorConfig['start']
            let count = 0
            let canEnd = false
            while (!canEnd) {
                output.value += current.value
                const nextOptions = current.next
                const nextKeys = Object.keys(nextOptions)
                const nextValues = Object.values(nextOptions)
                const total = nextValues.reduce((a, b) => a + b)
                let random = Math.random() * total
                let index = 0
                while (random > nextValues[index]) {
                    random -= nextValues[index]
                    index++
                }

                canEnd = count++ > length && !!current.end
                current = generatorConfig[nextKeys[index]]
                await new Promise(r => setTimeout(r, 10));
            }
        }

        return { generate, output }
    }

    return { generate: async () => {}, output: ref('') }
}