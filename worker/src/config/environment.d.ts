declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production',
        PORT: string,
        REDIS_HOST: string,
        REDIS_PASS: string,
        REDIS_PORT: string,
        QUEUE: string,
    }
}