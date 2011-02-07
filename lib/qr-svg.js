(function() {
  var ERRORCORRECTLEVEL_H, QRCode, toMatrix, toSvgFragment, typeNumberFor;
  QRCode = require('./qrcode').QRCode;
  ERRORCORRECTLEVEL_H = 2;
  typeNumberFor = function(len) {
    if (len > 119) {
      throw new Error("Too large.");
    }
    if (len > 98) {
      return 10;
    }
    if (len > 84) {
      return 9;
    }
    if (len > 64) {
      return 8;
    }
    if (len > 58) {
      return 7;
    }
    if (len > 44) {
      return 6;
    }
    if (len > 34) {
      return 5;
    }
    if (len > 24) {
      return 4;
    }
    if (len > 14) {
      return 3;
    }
    if (len > 7) {
      return 2;
    }
    return 1;
  };
  exports.toMatrix = toMatrix = function(text) {
    var m, qr, row, size, x, y;
    qr = new QRCode(typeNumberFor(text.length), ERRORCORRECTLEVEL_H);
    qr.addData(text);
    qr.make();
    size = qr.getModuleCount();
    m = [];
    for (y = 0; (0 <= size ? y < size : y > size); (0 <= size ? y += 1 : y -= 1)) {
      row = [];
      for (x = 0; (0 <= size ? x < size : x > size); (0 <= size ? x += 1 : x -= 1)) {
        row.push(qr.isDark(y, x) ? 0 : 1);
      }
      m.push(row);
    }
    return m;
  };
  exports.toSvgFragment = toSvgFragment = function(text, left, top, width) {
    var antigapFactor, arr, cell, m, row, size, x, y, _len, _len2;
    if (left == null) {
      left = 0;
    }
    if (top == null) {
      top = 0;
    }
    if (width == null) {
      width = 100;
    }
    arr = [];
    m = toMatrix(text);
    size = width / m.length;
    antigapFactor = 1.05;
    for (y = 0, _len = m.length; y < _len; y++) {
      row = m[y];
      for (x = 0, _len2 = row.length; x < _len2; x++) {
        cell = row[x];
        if (!cell) {
          arr.push('<rect x="' + (left + x * size).toPrecision(21), '" y="' + (top + y * size).toPrecision(21), '" width="' + (size * antigapFactor).toPrecision(21), '" height="' + (size * antigapFactor).toPrecision(21), '" fill="#000000" />\n');
        }
      }
    }
    return arr.join('');
  };
}).call(this);
