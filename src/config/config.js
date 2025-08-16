require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  github: {
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET
  }
};