Creating the CERN terminal font.

The process is pretty straight-forward. It is a two step processes. First you need to create an SVG file for each glyph. There is a template.svg which can be used to create new glyphs. There is a descender of two units and ascender of 3 units. This is used for didactics.

Once each glyph is an individual SVG file, you can import them into a font creation tool. We used the online service http://icomoon.io From this we upload and map each SVG file to a specific unicode code point.

We completed all the characters which are available on the IBM System 6000 keyboard. We ran a simple script to output all available characters and there were several more that we did not complete. We have left this open to anyone to continue to contribute and make a complete font based on the photos and template.