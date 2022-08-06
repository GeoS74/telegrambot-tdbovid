module.exports = (ctx) => {
  ctx.reply(`${ctx.update.message.from.first_name}, просто введи название зап.части или каталожный номер и я попробую что-нибудь подобрать для тебя`);
};
