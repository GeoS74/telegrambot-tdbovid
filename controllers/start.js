module.exports = (ctx) => {
  ctx.reply(`Привет, ${ctx.update.message.from.first_name}! Я бот, который помогает подбирать запасные части. Что ищешь?`);
};
