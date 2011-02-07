(function() {
  var assert, joinBuffers, settings, text_to_qrSvg;
  assert = require('assert');
  text_to_qrSvg = require('./qr-svg').toSvgFragment;
  joinBuffers = require('./util').joinBuffers;
  settings = {
    padding: 15,
    layout: 'portrait',
    qr_left: 230,
    qr_top: 20,
    qr_size: 180,
    qrs_left: 15 + 66,
    qrs_top: 320 + 50,
    qrs_size: 210,
    qrs_spacing_h: 190 - (66 * 2),
    qrs_spacing_v: 50
  };
  exports.keySvg = function(bitcoin_uri, p0, p1, p2, p3) {
    var h, s, w;
    s = settings;
    if (s.layout === 'portrait') {
      w = 210 - (2 * s.padding);
      h = 279 - (2 * s.padding);
    } else if (s.layout === 'landscape') {
      w = 279 - (2 * s.padding);
      h = 210 - (2 * s.padding);
    }
    return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg\n    width=\"" + w + "mm\"\n    height=\"" + h + "mm\"\n    xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n    xmlns:cc=\"http://creativecommons.org/ns#\"\n    xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n    xmlns:svg=\"http://www.w3.org/2000/svg\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    version=\"1.1\">\n  \n  <!-- " + bitcoin_uri + " -->\n  " + (text_to_qrSvg(bitcoin_uri, s.qr_left, s.qr_top, s.qr_size)) + "\n  \n  <!-- " + p0 + " -->\n  " + (text_to_qrSvg(p0, s.qrs_left, s.qrs_top, s.qrs_size)) + "\n  \n  <!-- " + p1 + " -->\n  " + (text_to_qrSvg(p1, s.qrs_left, s.qrs_top + s.qrs_size + s.qrs_spacing_v, s.qrs_size)) + "\n  \n  <!-- " + p2 + " -->\n  " + (text_to_qrSvg(p2, s.qrs_left + s.qrs_size + s.qrs_spacing_h, s.qrs_top, s.qrs_size)) + "\n  \n  <!-- " + p3 + " -->\n  " + (text_to_qrSvg(p3, s.qrs_left + s.qrs_size + s.qrs_spacing_h, s.qrs_top + s.qrs_size + s.qrs_spacing_v, s.qrs_size)) + "\n  \n</svg>\n";
  };
}).call(this);
