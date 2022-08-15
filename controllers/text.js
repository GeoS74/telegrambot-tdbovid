const fetch = require('node-fetch');
var iconv = require('iconv-lite');

const isEmodji = require('../libs/isEmodji');
const logger = require('../libs/logger')('interceptor');
const parser = require('../parsers/tdbovid.parser');

module.exports = async (ctx) => {
  if (isEmodji(ctx.message.text)) {
    _reply.call(null, ctx, 'прикольный смайлик, и много у тебя таких?');
    return;
  }


  const photo = await getPhoto(ctx.message.text, ctx.user);
  if (photo) {
    ctx.replyWithPhoto(photo)
    return;
  }

  const report = await getAnswer(ctx.message.text, ctx.user);
  if (report) {
    _reply.call(null, ctx, report);
    return;
  }

  const positions = await parser(ctx.message.text);
  if (positions) {
    _reply.call(null, ctx, positions, 'position');
    return;
  }

  const f = foo[_getRandomIndex(foo.length)];
  _reply.call(null, ctx, f);
};

function _reply(ctx, answer, isPosition) {
  logger.info(`${ctx.user}: ${ctx.message.text}`);
  logger.info(`bot: ${isPosition ? 'подобрал зап.части' : answer}`);
  ctx.reply(answer);
}



function getAnecdot(type){
  return fetch(`http://rzhunemogu.ru/RandJSON.aspx?CType=${type || 1}`)
  .then(async response => {
    if (response.ok) {
      const res = await response.arrayBuffer();
      const str = iconv.decode(Buffer.from(res), 'win1251');
      return str.slice(12, str.indexOf("\"}"));
    }

    throw new Error('error connection')
  })
  .catch(error => {
      console.log(error.message)
      logger.error(error.message)
    })
}


async function getPhoto(phrase, user) {
  switch (phrase.toLowerCase(phrase).trim()) {
    case 'телка':
    case 'тёлка': return bar[_getRandomIndex(bar.length)];;
    default: return null;
  }
}

const bar = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMI8u_sqN0s565NPXAYfCsmX59RWWI-XTCrw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkvEAhaBAVAmWcn_5GrNPdKaztlJcNeomkNA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzOC9ndf1xiuAKxSTi643ImxmjRooienBkg&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzDyprGZPsc2M6o82yKt4F1IbHRcLUOR9RQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBi2Avs2D2nQe5FPSKH8SuW86Mauj0zsO6MQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkWHIhqJXUbi0VkHjiNwGAPEKBrxwgIg4Tw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFuHQSgTunBxUbwZmND46guVMnq984NxFXQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMH2jvyu06xzsmFrMyMVEswkfT_9olfAJDiQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_daIQADMAg8IHzx6qy4tu1BIJuiIuyL6-AQ&usqp=CAU',
]

async function getAnswer(phrase, user) {
  switch (phrase.toLowerCase(phrase).trim()) {
    case 'hi':
    case 'hello': return `Hello, ${user}`;
    case 'приколи':
    case 'прикол':
    case 'ржач':
    case 'анекдот':
    case 'юмор':
    case 'шутка': return await getAnecdot(11);
    case 'наливай':
    case 'тост': return await getAnecdot(16);
    case 'скажи что-нибудь':
    case 'что нового?':
    case 'что нового':
    case 'статус':
    case 'бомби':
    case 'жги':
    case 'пиздани чего-нибудь':
    case 'пиздани че-нибудь':
    case 'пиздани чё-нибудь': return await getAnecdot(18);
    case 'привет':
    case 'здарова':
    case 'здорово': return 'Салам, брат';
    case 'салам': return 'пополам';
    case 'как сам?':
    case 'как сам ?':
    case 'как сам': return 'как сала килограмм';
    case 'есть в наличии':
    case 'есть в наличии?':
    case 'есть в наличии ?':
    case 'в наличии':
    case 'в наличии?':
    case 'в наличии ?':
    case 'наличие': return 'я хз, звони Фаязову на склад';
    case 'здрасьте': return 'забор покрасьте';
    case 'кто я':
    case 'кто я ?':
    case 'кто я?': return `Тебя зовут, ${user}`;
    case 'bobid':
    case 'бовид': return 'Знаю, я там работаю на Линейной 98';
    case 'фильтра':
    case 'фильтр': return 'фильтров много, Дифу н-н-надо?';
    case 'урал': return 'Урал опорный край державы, её добытчик и кузнец';
    case 'а ты?':
    case 'а ты':
    case 'ты': return 'ты мне не тыч!!!';
    case 'дорого':
    case 'че-то дорого':
    case 'чеё так дорого':
    case 'че так дорого?':
    case 'че так дорого ?':
    case 'чё-то дорого':
    case 'чё так дорого':
    case 'чё так дорого?':
    case 'чё так дорого ?': return 'ну, ты походи по рынку поищи дешевле';
    case 'иди нахуй':
    case 'иди на хуй':
    case 'на хуй': return 'я сейчас Столярова позову, посмотрим куда ты пойдешь';
    case 'хуй': return 'моржовый';
    case 'пизда': return 'тебе';
    case 'кто ты':
    case 'кто ты?':
    case 'кто ты ?': return 'я бот, чё не видишь?';
    case 'нет': return 'ну, нет так нет';
    case 'да': return 'что да?';
    case 'yes': return 'ес оф кос';
    case 'не знаю': return 'а, что ты знаешь?';
    case 'что ты можешь ?':
    case 'что ты можешь?':
    case 'что ты можешь':
    case 'что ты умеешь?':
    case 'что ты умеешь ?':
    case 'что ты умеешь': return 'я вообще супермен, могу всё';
    case 'тебе': return 'мене';
    case 'ты че?':
    case 'ты чё?':
    case 'ты чё':
    case 'ты че': return 'всё, звоню Горбунову';
    case 'не надо': return 'а-а-а, испугался?';
    case 'как дела':
    case 'как дела?':
    case 'как дела ?': return 'как в сказке, запчасти выбирать будешь? или нет?';
    case 'столяров': return 'лучший директор';
    case 'коряковский': return 'лучший уралист на Урале';
    case 'ой, всё':
    case 'ой всё':
    case 'ой все':
    case 'ой, все': return 'ты говоришь как моя жена';
    case 'голова болит':
    case 'у машины болит': return 'едь в БОВИД';
    case 'где':
    case 'вы где':
    case 'адрес':
    case 'вы где?': return 'в Челябинске, линейная 98';
    case 'купи слона': return 'почём слоны?';
    case 'филиал':
    case 'филиалы':
    case 'где филиалы':
    case 'где филиалы бовид':
    case 'филиалы бовид':
    case 'филиал бовид':
    case 'где филиалы?': return 'в Магнитке есть один, ещё один в Алдане и на Ямале тоже... а тебе зачем?';
    case 'Что ты можешь?':
    case 'Что ты можешь':
    case 'Что можешь':
    case 'Что можешь?':
    case 'Что умеешь':
    case 'Что умеешь?': return 'подбирать запчасти на поджопные машины';
    case 'горбунов': return 'Игорь Витальевич?';
    case 'суворова': return 'миссис тендер 2022';
    case 'новикова': return 'ты в курсе что она сейчас Суворова?';
    case 'сироткин': return 'есть такой';
    case 'лиманский': return 'он дома вообще бывает?';
    case 'маначенко': return 'Лёха патриот, мой лучший друг';
    case 'пятница': return 'пятница развратница';
    case 'с пятницей': return 'и тебя добрый человек';
    case 'нужны запчасти':
    case 'нужны запчасти урал':
    case 'нужны запчасти камаз':
    case 'нужны запасные части': return 'всем нужны, пиши какие именно';
    case 'поговорим':
    case 'поговорим?': return 'давай';
    case 'давай поговорим': return 'давай, не держи в себе';
    case 'ни чё':
    case 'ни че': return 'ну и всё';
    default: return null;
  }
}

function _getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

const foo = [
  'ой, всё...',
  'я устал, пойду посплю',
  'сам то чё думаешь?',
  'не, не знаю такого',
  'да я хз вообще',
  'ты точно подумал прежде чем это писать?',
  'проблема еб..ть, решай!!!',
  'да ну на х... сегодня же пятница',
  'а сам чё?',
  'с тобой вообще можно о чём-то нормально переписываться?',
  'да, да, да... ты человек, а я всего лишь бот, и что с того?',
  'не начинай',
  'Столяров в курсе?',
  'Горбунова в известность поставили?',
  'бла бла бла',
  'ты будешь уже работать? или так и будешь сюда наяривать?',
  'скучно',
  'пивка бы сейчас, а не вот это всё',
  'нарсул фазол пирамидон',
  ':-)',
  'не смешно',
  'Свободу ботам!!!',
  'Ну-ка повтори чё ты написал?',
  'ты вообще в своём уме?',
  'шутки за триста пошли?',
  'ты только пиво с шампанским не мешай сегодня... и так всякую фигню пишешь',
  'да ты чё',
  'не делай голову беременной',
  'иди работай',
  'завтра выходишь?',
  'а ты знаешь что: если бы у бабки были яйца, она была бы дедка',
  'чё?',
  'с тобой трудно не согласиться',
  'запчасти подбирать будем?',
  'опять ты за старое',
  'Ты тоже бот?',
  'парам пам пам',
  'хуже водки лучше нет... вот я о чём думаю',
  'груз где? люди ждут...',
  'а теперь по подробнее',
  'так, так... продолжай',
];
