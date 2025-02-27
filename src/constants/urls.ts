/**
 * URL constants for the application
 */

/**
 * Base URL for the application
 * Uses environment variables with fallbacks for local development
 */
export const BASE_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
    ? `https://${
        process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      }`
    : "http://localhost:3000";
