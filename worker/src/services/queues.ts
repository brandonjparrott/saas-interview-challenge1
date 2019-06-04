import Queue from "bull";
import * as config from "../config";

const redisConfig: object = {
    redis: {
        port: config.REDIS_PORT,
        host: config.REDIS_HOST,
        password: config.REDIS_PASS
    }
};

export const FLIGHT_LOOKUP = config.WORK_QUEUE;

export const queues = {
    [FLIGHT_LOOKUP]: new Queue(
        FLIGHT_LOOKUP,
        redisConfig
    )
};
