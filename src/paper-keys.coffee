
assert = require 'assert'

{keySvg} = require './draw'
{readText} = require './util'


exports.main = () ->
  
  _loadKeyInfo = (callback) ->
    
    opt = require('optimist').argv
    
    if opt['from-json']
      process.stdin.resume()
      readText process.stdin, (json) ->
        callback JSON.parse json
    
    else if opt['new-bitcoin-key']
      bitcoin_impl = require 'bitcoin-impl'
      [priv, pub] = bitcoin_impl.new_keypair()
      addr = bitcoin_impl.base58_encode(
              bitcoin_impl.pubkey_to_address256(pub))
      callback {
        private64: priv.toString 'base64'
        public64: pub.toString 'base64'
        bitcoin_address: addr
      }
    
    else
      console.log "Invalid args"
      process.exit 1
  
  _loadKeyInfo (info) ->
    
    {private64, public64, bitcoin_address} = info
    assert.equal private64.length, 372
    assert.equal public64.length, 88
    str = 'btckey:' + private64 + ':' + public64
    p0 = '0:' + str.substr (0 * 117), 117
    p1 = '1:' + str.substr (1 * 117), 117
    p2 = '2:' + str.substr (2 * 117), 117
    p3 = '3:' + str.substr (3 * 117), 117
    bitcoin_uri = "bitcoin:#{bitcoin_address}"
    
    process.stdout.write keySvg bitcoin_uri, p0, p1, p2, p3

