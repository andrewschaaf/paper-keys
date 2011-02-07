(function() {
  exports.readText = function(s, callback) {
    var chunks;
    chunks = [];
    s.on('data', function(data) {
      return chunks.push(data.toString('base64'));
    });
    return s.on('end', function() {
      return callback(chunks.join(''));
    });
  };
  exports.joinBuffers = function(bufs) {
    var buf, len, pos, result, _i, _j, _len, _len2;
    len = 0;
    for (_i = 0, _len = bufs.length; _i < _len; _i++) {
      buf = bufs[_i];
      len += buf.length;
    }
    result = new Buffer(len);
    pos = 0;
    for (_j = 0, _len2 = bufs.length; _j < _len2; _j++) {
      buf = bufs[_j];
      buf.copy(result, pos);
      pos += buf.length;
    }
    return result;
  };
}).call(this);
