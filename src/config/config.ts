export const config = {
  PORT: process.env.PORT || 9001,
  HOST: process.env.PORT || 'http://localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

  serverRateLimits: {
    period: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000
  },

  JWT_SECRET: process.env.JWT_SECRET || 'uf7e^WaiUGFSA7fd8&^dadh',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '3fhfsdjfkf$$uIEFSHFKdf',
  JWT_REFRESH_SECRET_ADMIN: process.env.JWT_REFRESH_SECRET_ADMIN || '3fhfsdjfkf$$uIEFSHFKdfADMIN',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://root:root@cluster0.bhdaxxg.mongodb.net/?retryWrites=true&w=majority'
};
