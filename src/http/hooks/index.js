import { sequence } from '@sveltejs/kit/hooks';

// Logger Middleware
import { logRequestsHandler } from '@hooks/logs.hooks';

// Cache Middlewares
import { checkWeatherCacheHandler } from '@hooks/cache.hooks';

// Middlewares - from first to last
export const handle = sequence(logRequestsHandler, checkWeatherCacheHandler);
