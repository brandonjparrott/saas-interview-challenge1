import * as config from "../config";
import Redis from "ioredis";

/**
 * Redis Config object for Bull Queue
 */
export const REDIS_CONFIG: object = {
    port: config.REDIS_PORT,
    host: config.REDIS_HOST,
    password: config.REDIS_PASS
};

const clientInstance = new Redis(REDIS_CONFIG);
const subscriberInstance = new Redis(REDIS_CONFIG);

export const REDIS_CREATE_CLIENT = (type: string) => {
    switch (type) {
        case 'client':
            return clientInstance;
        case 'subscriber':
            return subscriberInstance;
        default:
            return new Redis(REDIS_CONFIG);
    }
};
