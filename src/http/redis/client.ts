// External libs
import 'dotenv/config';

import Redis, { type RedisOptions } from 'ioredis';

import { logger } from '@log';

const redisConfig: RedisOptions = {
	enableReadyCheck: true,
	maxRetriesPerRequest: 6
};

// TODO upgrade 2 db for staging and prod when data load is sufficient
const rediss = process.env.UPSTASH_REDIS_DB_URL as string;
const redis = new Redis(rediss, redisConfig);

redis.on('connect', () => {
	logger.info('Redis client connected');
});

redis.on('ready', () => {
	logger.info('Redis client is ready');
});

redis.on('error', (err: any) => {
	logger.error(err);
});

export const cache = redis;
