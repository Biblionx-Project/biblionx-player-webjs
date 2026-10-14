var defaultBackend = (typeof process !== 'undefined' && process.env && process.env.BIBLIONX_BACKEND_URL)
  || (typeof window !== 'undefined' && (window.BIBLIONX_BACKEND_URL || window.BIBLIONX_API_URL))
  || 'http://localhost:8000';

exports.defaultRegion = 'DO';
exports.region = 'DO';
exports.defaultSignLanguage = 'LSRD';
exports.signLanguage = 'LSRD';

exports.backendUrl = defaultBackend;
exports.translatorUrl = (typeof process !== 'undefined' && process.env && process.env.BIBLIONX_TRANSLATOR_URL)
  || (typeof window !== 'undefined' && window.BIBLIONX_TRANSLATOR_URL)
  || (defaultBackend + '/api/v1/translate');

exports.dictionaryUrl = (typeof process !== 'undefined' && process.env && process.env.BIBLIONX_DICTIONARY_URL)
  || (typeof window !== 'undefined' && window.BIBLIONX_DICTIONARY_URL)
  || (defaultBackend + '/dictionary/');

exports.dictionaryStaticUrl = (typeof process !== 'undefined' && process.env && process.env.BIBLIONX_DICTIONARY_STATIC_URL)
  || (typeof window !== 'undefined' && window.BIBLIONX_DICTIONARY_STATIC_URL)
  || (defaultBackend + '/static/BUNDLES/');