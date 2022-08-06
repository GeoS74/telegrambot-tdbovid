const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

module.exports = async (message) => {
  const html = await _getPage(message);
  const data = _parseHTML(html);
  return _answer(data);
};

function _getPage(message) {
  return fetch(`https://tdbovid.ru/katalog-zapchastej/rezultaty-poiska?query=${encodeURI(message)}&limit=5`)
    .then(async (res) => {
      if (res.ok) {
        const html = await res.text();
        return html;
      }
      throw new Error(`error status ${res.status} message: ${message}`);
    });
}

function _parseHTML(html) {
  const result = [];
  const dom = new JSDOM(html);
  const positions = dom.window.document.querySelectorAll('.productrow2');

  if (positions.length) {
    for (const position of positions) {
      result.push({
        code: position.querySelector(':nth-child(3)')?.innerHTML?.trim() || '',
        article: position.querySelector(':nth-child(2)')?.innerHTML?.trim() || '',
        title: position.querySelector(':nth-child(4)')?.querySelector('p')?.innerHTML?.trim() || '',
        price: position.querySelector('.price')?.innerHTML?.trim() || '',
      });
    }
  }
  return result;
}

function _answer(data) {
  let str = '';
  for (const pos of data) {
    str += `код: ${pos.code}\n${pos.article}\n${pos.title}\nцена: ${pos.price}\n\n`;
  }
  return str;
}
