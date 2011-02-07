


exports.readText = (s, callback) ->
  chunks = []
  s.on 'data', (data) -> chunks.push data.toString 'base64'
  s.on 'end', () -> callback chunks.join ''


exports.joinBuffers = (bufs) ->
  len = 0
  for buf in bufs
    len += buf.length
  result = new Buffer len
  pos = 0
  for buf in bufs
    buf.copy result, pos
    pos += buf.length
  result

