/**
 * Centralized environment configuration
 * All environment variables are defined here with type-safe access
 * This eliminates repetition and ensures consistent usage across the app
 */

function isLocalHostname(hostname = '') {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function isLocalUrl(url = '') {
  return /localhost|127\.0\.0\.1|\[::1\]/.test(url);
}

/**
 * Resolve API base URL safely.
 * Public HTTPS sites must never call localhost - that triggers Chrome's
 * "Access other apps and services on this device" Local Network Access prompt.
 * On production we prefer same-origin `/api` (empty base) and static fallbacks.
 */
function resolveApiUrl() {
  const configured = import.meta.env.VITE_API_URL || '';

  if (typeof window !== 'undefined') {
    const onLocalPage = isLocalHostname(window.location.hostname);
    if (!onLocalPage && isLocalUrl(configured)) {
      return '';
    }
  }

  if (configured) return configured.replace(/\/$/, '');

  if (import.meta.env.DEV) return 'http://localhost:5000';

  return '';
}

export const ENV = {
  // API Configuration
  API_URL: resolveApiUrl(),

  // Contact Information
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'niyinnocent2027@gmail.com',

  // Social Media URLs
  SOCIAL: {
    LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/innocent-niyonziima/',
    GITHUB: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Rwandantechy',
    TWITTER: import.meta.env.VITE_TWITTER_URL || 'https://x.com/Rwandantechy',
    FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/Rwandantechy/',
  },

  // Development flag
  isDevelopment: import.meta.env.MODE === 'development',
};

// Export individual constants for convenience
export const {
  API_URL,
  CONTACT_EMAIL,
  SOCIAL,
  isDevelopment,
} = ENV;
