
assert = require 'assert'
text_to_qrSvg = require('./qr-svg').toSvgFragment
{joinBuffers} = require './util'


settings = {
  padding: 15
  layout: 'portrait'
  
  qr_left: 230
  qr_top: 20
  qr_size: 180
  
  qrs_left: 15 + 66
  qrs_top: 320 + 50
  qrs_size: 210
  qrs_spacing_h: 190 - (66 * 2)
  qrs_spacing_v: 50
}

exports.keySvg = (bitcoin_uri, p0, p1, p2, p3) ->
  
  s = settings
  
  # Paper sizes (mm)
  # A4:     210   x 297
  # Letter: 215.9 x 279.4
  # Intersection: 210 x 279
  if s.layout == 'portrait'
    w = 210 - (2 * s.padding)
    h = 279 - (2 * s.padding)
  else if s.layout == 'landscape'
    w = 279 - (2 * s.padding)
    h = 210 - (2 * s.padding)
  
  """
  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg
      width="#{w}mm"
      height="#{h}mm"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1">
    
    <!-- #{bitcoin_uri} -->
    #{text_to_qrSvg bitcoin_uri, s.qr_left, s.qr_top, s.qr_size}
    
    <!-- #{p0} -->
    #{text_to_qrSvg p0, s.qrs_left, s.qrs_top, s.qrs_size}
    
    <!-- #{p1} -->
    #{text_to_qrSvg p1, s.qrs_left, s.qrs_top + s.qrs_size + s.qrs_spacing_v, s.qrs_size}
    
    <!-- #{p2} -->
    #{text_to_qrSvg p2, s.qrs_left + s.qrs_size + s.qrs_spacing_h, s.qrs_top, s.qrs_size}
    
    <!-- #{p3} -->
    #{text_to_qrSvg p3, s.qrs_left + s.qrs_size + s.qrs_spacing_h, s.qrs_top + s.qrs_size + s.qrs_spacing_v, s.qrs_size}
    
  </svg>
  
  """

