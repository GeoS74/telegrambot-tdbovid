const logger = require('../libs/logger')();

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error.message);
    ctx.reply('Упс, что-то пошло не так... повторите запрос позже');
  }
};
