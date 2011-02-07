
{QRCode} = require './qrcode'


ERRORCORRECTLEVEL_H = 2


typeNumberFor = (len) ->
  throw new Error "Too large."  if len > 119
  return 10                     if len > 98
  return 9                      if len > 84
  return 8                      if len > 64
  return 7                      if len > 58
  return 6                      if len > 44
  return 5                      if len > 34
  return 4                      if len > 24
  return 3                      if len > 14
  return 2                      if len > 7
  return 1


exports.toMatrix = toMatrix = (text) ->
  qr = new QRCode(
          typeNumberFor(text.length),
          ERRORCORRECTLEVEL_H)
  qr.addData text
  qr.make()
  size = qr.getModuleCount()
  m = []
  for y in [0...size]
    row = []
    for x in [0...size]
      row.push if qr.isDark(y, x) then 0 else 1
    m.push row
  m


exports.toSvgFragment = toSvgFragment = (text, left = 0, top = 0, width = 100) ->
  arr = []
  m = toMatrix text
  size = width / m.length
  antigapFactor = 1.05
  for row, y in m
    for cell, x in row
      if not cell
        arr.push(
            '<rect x="' + (left + x * size).toPrecision(21),
            '" y="' + (top + y * size).toPrecision(21),
            '" width="' + (size * antigapFactor).toPrecision(21),
            '" height="' + (size * antigapFactor).toPrecision(21),
            '" fill="#000000" />\n')
  arr.join ''

