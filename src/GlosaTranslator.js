var request = require('superagent');

function GlosaTranslator(endpoint) {
  this.endpoint = endpoint;
}

GlosaTranslator.prototype.translate = function (text, domain, callback) {
  const time = 30000; // 30s
  let hasTimeout = false;

  const timeout = setTimeout(() => {
    hasTimeout = true;
    callback(undefined, 'timeout_error');
  }, time);

  request.post(this.endpoint, { text: text, texto: text, domain: domain }).end(
    function (err, response) {
      if (hasTimeout) return;

      clearTimeout(timeout);
      if (err) callback(undefined, err);
      else {
        if (response && response.body && response.body.nlp_analysis && response.body.nlp_analysis.secuencia_lsrd) {
          callback(response.body.nlp_analysis.secuencia_lsrd.join(' '));
        } else if (response && response.body && response.body.secuencia_senas) {
          callback(response.body.secuencia_senas.map(function (s) { return s.palabra_es || s.letra || ''; }).filter(Boolean).join(' '));
        } else {
          callback(response.text);
        }
      }
    }
  );
};

module.exports = GlosaTranslator;
