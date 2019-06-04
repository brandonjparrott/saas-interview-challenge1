
/**
 * Service Environment
 */
export const ENVIRONEMENT: string = process.env.NODE_ENV || "development";

/**
 * API Port
 */
export const PORT: string = process.env.PORT || "80";

/**
 * Redis Host
 */
export const REDIS_HOST: string = process.env.REDIS_HOST;

/**
 * Redis Password
 */
export const REDIS_PASS: string = process.env.REDIS_PASS;

/**
 * Redis Port
 */
export const REDIS_PORT: string = process.env.REDIS_PORT || "6379";

/**
 * Work Queue name
 */
export const WORK_QUEUE: string = process.env.WORK_QUEUE || "work-queue";
