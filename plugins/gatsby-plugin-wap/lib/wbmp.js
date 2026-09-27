/* eslint-disable no-bitwise */ // bit-packing a binary image format
const sharp = require('sharp');

// WBMP stores width and height as "multibyte integers": 7 bits per byte,
// most significant group first, high bit set on every byte except the last.
const multibyte = (value) => {
  const bytes = [value % 128];
  let rest = Math.floor(value / 128);
  while (rest > 0) {
    bytes.unshift((rest % 128) | 0x80);
    rest = Math.floor(rest / 128);
  }
  return bytes;
};

// Floyd-Steinberg error diffusion down to pure black and white - the only
// thing a WBMP (and a Nokia screen) can show.
const dither = (pixels, width, height) => {
  const values = Float32Array.from(pixels);
  const out = new Uint8Array(width * height);
  const spread = (x, y, amount) => {
    if (x >= 0 && x < width && y < height) values[y * width + x] += amount;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x;
      const white = values[i] >= 128;
      out[i] = white ? 1 : 0;
      const error = values[i] - (white ? 255 : 0);
      spread(x + 1, y, (error * 7) / 16);
      spread(x - 1, y + 1, (error * 3) / 16);
      spread(x, y + 1, (error * 5) / 16);
      spread(x + 1, y + 1, error / 16);
    }
  }
  return out;
};

// Any image sharp can read -> WBMP type 0 (1 bit per pixel, 1 = white).
module.exports = async function toWbmp(input, maxWidth) {
  const { data, info } = await sharp(input, { animated: false })
    .flatten({ background: '#ffffff' })
    .resize({ width: maxWidth, withoutEnlargement: true })
    .greyscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const grey = new Uint8Array(width * height);
  for (let i = 0; i < grey.length; i += 1) grey[i] = data[i * channels];

  const bits = dither(grey, width, height);
  const rowBytes = Math.ceil(width / 8);
  const body = Buffer.alloc(rowBytes * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (bits[y * width + x]) {
        body[y * rowBytes + (x >> 3)] |= 0x80 >> (x & 7);
      }
    }
  }

  const header = Buffer.from([0, 0, ...multibyte(width), ...multibyte(height)]);
  return Buffer.concat([header, body]);
};
