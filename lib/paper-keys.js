(function() {
  var assert, keySvg, readText;
  assert = require('assert');
  keySvg = require('./draw').keySvg;
  readText = require('./util').readText;
  exports.main = function() {
    var _loadKeyInfo;
    _loadKeyInfo = function(callback) {
      var addr, bitcoin_impl, opt, priv, pub, _ref;
      opt = require('optimist').argv;
      if (opt['from-json']) {
        process.stdin.resume();
        return readText(process.stdin, function(json) {
          return callback(JSON.parse(json));
        });
      } else if (opt['new-bitcoin-key']) {
        bitcoin_impl = require('bitcoin-impl');
        _ref = bitcoin_impl.new_keypair(), priv = _ref[0], pub = _ref[1];
        addr = bitcoin_impl.base58_encode(bitcoin_impl.pubkey_to_address256(pub));
        return callback({
          private64: priv.toString('base64'),
          public64: pub.toString('base64'),
          bitcoin_address: addr
        });
      } else {
        console.log("Invalid args");
        return process.exit(1);
      }
    };
    return _loadKeyInfo(function(info) {
      var bitcoin_address, bitcoin_uri, p0, p1, p2, p3, private64, public64, str;
      private64 = info.private64, public64 = info.public64, bitcoin_address = info.bitcoin_address;
      assert.equal(private64.length, 372);
      assert.equal(public64.length, 88);
      str = 'btckey:' + private64 + ':' + public64;
      p0 = '0:' + str.substr(0 * 117, 117);
      p1 = '1:' + str.substr(1 * 117, 117);
      p2 = '2:' + str.substr(2 * 117, 117);
      p3 = '3:' + str.substr(3 * 117, 117);
      bitcoin_uri = "bitcoin:" + bitcoin_address;
      return process.stdout.write(keySvg(bitcoin_uri, p0, p1, p2, p3));
    });
  };
}).call(this);
