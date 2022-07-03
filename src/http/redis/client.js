// External libs
import 'dotenv/config';

import Redis from 'ioredis';

import { logger } from '@log';

const redisConfig = {
	enableReadyCheck: true,
	maxRetriesPerRequest: 6
};

// TODO upgrade 2 db for staging and prod when data load is sufficient
const rediss = process.env.UPSTASH_REDIS_DB_URL;
const redis = new Redis(rediss, redisConfig);

redis.on('connect', () => {
	logger.info('Redis client connected');
});

redis.on('ready', () => {
	logger.info('Redis client is ready');
});

redis.on('error', (err) => {
	logger.error(err);
});

export const cache = redis;
