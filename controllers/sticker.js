module.exports = (ctx) => {
  const emoji = ctx.update.message.sticker?.emoji;
  if (emoji) {
    ctx.reply(ctx.update.message.sticker.emoji);
    return;
  }
  ctx.reply('прикольный стикер, есть ещё?');
};
