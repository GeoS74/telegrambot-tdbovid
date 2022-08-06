module.exports.start = (ctx) => {
  ctx.reply(`Привет, ${ctx.update.message.from.first_name}! Я бот, который помогает подбирать запасные части. Что ищешь?`);
};
module.exports.help = (ctx) => {
  ctx.reply(`${ctx.update.message.from.first_name}, просто введи название зап.части или каталожный номер и я попробую что-нибудь подобрать для тебя`);
};
