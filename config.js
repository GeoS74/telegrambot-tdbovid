require('dotenv').config({ path: './secret.env' });

module.exports = {
  bot: {
    token: process.env.BOT_TOKEN || null,
  },
};
