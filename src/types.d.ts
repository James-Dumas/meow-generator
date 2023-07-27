export interface TextGeneratorConfig {
    [key: string]: {
        value: string,
        next: {
            [key: string]: number
        }
        end?: boolean
    }
}
