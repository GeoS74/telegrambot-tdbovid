module.exports = async (ctx, next) => {
  ctx.user = ctx.update.message.from.first_name;
  await next();
};
