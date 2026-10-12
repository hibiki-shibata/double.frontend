type CoreConfig = {
    RUNTIME_ENV: "prod" | "dev" | "stg"
    BFF_URI: string
} & Record<string, unknown>;


export const coreConfig: CoreConfig = {
    RUNTIME_ENV: "dev",
    BFF_URI: "http://localhost:3000/api/v1"
}