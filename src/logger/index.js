// Prod logger
import { prodLogger } from './prodLogger';

// Dev logger
import { devLogger } from './devLogger';

const env = import.meta.env.VITE_ENVIRONMENT;

export const logger = env === 'prod' ? prodLogger() : devLogger();
