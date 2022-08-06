const log4js = require('log4js');
const path = require('path');

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    file: {
      type: 'file',
      filename: path.join(__dirname, '../log/olo.log'),
    },
  },
  categories: {
    default: {
      appenders: ['out', 'file'],
      level: 'all',
    },
    interceptor: {
      appenders: ['file'],
      level: 'all',
    },
  },
});

module.exports = (category) => log4js.getLogger(category || 'default');
