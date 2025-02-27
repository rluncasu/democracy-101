/**
 * URL constants for the application
 */

/**
 * Base URL for the application
 * Uses environment variables with fallbacks for local development
 */
export const BASE_URL = 
  process.env.VERCEL_PROJECT_PRODUCTION_URL || 
  process.env.VERCEL_URL || 
  "http://localhost:3000";

/**
 * Metadata base URL for SEO
 */
export const METADATA_BASE_URL = 'https://democracy-101.radul.workers.dev'; 