const { Telegraf } = require('telegraf');

const config = require('./config');
const errorInterceptor = require('./middleware/error.interceptor');
const emodjiValidator = require('./middleware/validators/emodji.validator');
const user = require('./middleware/user');
const start = require('./controllers/start');
const help = require('./controllers/help');
const sticker = require('./controllers/sticker');
const text = require('./controllers/text');

const bot = new Telegraf(config.bot.token);

bot.use(errorInterceptor, user);
bot.start(start);
bot.help(help);
bot.on('sticker', sticker);
bot.on('text', emodjiValidator, text);

bot.launch();
