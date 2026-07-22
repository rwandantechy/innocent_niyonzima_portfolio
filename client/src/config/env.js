/**
 * Centralized environment configuration
 * All environment variables are defined here with type-safe access
 * This eliminates repetition and ensures consistent usage across the app
 */

export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',

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
